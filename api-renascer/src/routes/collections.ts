import type { Collection } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../database/prisma';
import { collectionSchema, updateCollectionSchema, updateCollectionStatusSchema } from '../schemas';

const collectionSwaggerSchemas = {
  collection: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      supplierId: { type: 'integer' },
      status: { type: 'string', enum: ['Scheduled', 'Confirmed', 'Collected'] },
      dateTime: { type: 'string', format: 'date-time' },
      location: { type: 'string' },
      productId: { type: 'integer' },
      weight: { type: 'number' },
      value: { type: 'number' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      supplier: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          email: { type: 'string' }
        }
      },
      product: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          unit: { type: 'string' }
        }
      }
    }
  },
  createCollection: {
    type: 'object',
    required: ['supplierId', 'dateTime', 'location', 'productId', 'weight', 'value'],
    properties: {
      supplierId: { type: 'integer' },
      status: { type: 'string', enum: ['Scheduled', 'Confirmed', 'Collected'], default: 'Scheduled' },
      dateTime: { type: 'string', format: 'date-time' },
      location: { type: 'string' },
      productId: { type: 'integer' },
      weight: { type: 'number' },
      value: { type: 'number' }
    }
  },
  updateStatus: {
    type: 'object',
    required: ['status'],
    properties: {
      status: { type: 'string', enum: ['Scheduled', 'Confirmed', 'Collected'] }
    }
  }
};

export async function collectionsRoutes(fastify: FastifyInstance) {
  // GET /collections - List all collections
  fastify.get('/collections', {
    schema: {
      tags: ['Collections'],
      description: 'Get all collections',
      response: {
        200: {
          type: 'array',
          items: collectionSwaggerSchemas.collection
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const collections = await prisma.collection.findMany({
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              unit: true
            }
          }
        },
        orderBy: { dateTime: 'desc' }
      });
      return reply.code(200).send(collections);
    } catch (error) {
      console.error('Error fetching collections:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // GET /collections/by-date/:date - Get collections by specific date (for calendar view)
  fastify.get<{ Params: { date: string } }>('/collections/by-date/:date', {
    schema: {
      tags: ['Collections'],
      description: 'Get collections for a specific date (calendar view)',
      params: {
        type: 'object',
        properties: {
          date: { 
            type: 'string',
            pattern: '^\\d{4}-\\d{2}-\\d{2}$',
            description: 'Date in YYYY-MM-DD format'
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            date: { type: 'string' },
            collections: {
              type: 'array',
              items: collectionSwaggerSchemas.collection
            },
            summary: {
              type: 'object',
              properties: {
                totalCollections: { type: 'integer' },
                totalWeight: { type: 'number' },
                totalValue: { type: 'number' },
                byStatus: {
                  type: 'object',
                  properties: {
                    Scheduled: { type: 'integer' },
                    Confirmed: { type: 'integer' },
                    Collected: { type: 'integer' }
                  }
                }
              }
            }
          }
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { date: string } }>, reply: FastifyReply) => {
    try {
      const { date } = request.params;
      
      // Validate date format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        return reply.code(400).send({ error: 'Invalid date format. Use YYYY-MM-DD' });
      }

      const startDate = new Date(date + 'T00:00:00.000Z');
      const endDate = new Date(date + 'T23:59:59.999Z');

      // Check if date is valid
      if (isNaN(startDate.getTime())) {
        return reply.code(400).send({ error: 'Invalid date' });
      }

      const collections = await prisma.collection.findMany({
        where: {
          dateTime: {
            gte: startDate,
            lte: endDate
          }
        },
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              unit: true
            }
          }
        },
        orderBy: { dateTime: 'asc' }
      });

      // Calculate summary statistics
      const totalCollections = collections.length;
      const totalWeight = collections.reduce((sum, collection) => sum + collection.weight, 0);
      const totalValue = collections.reduce((sum, collection) => sum + collection.value, 0);
      
      const byStatus = {
        Scheduled: 0,
        Confirmed: 0,
        Collected: 0
      };
      
      collections.forEach(collection => {
        byStatus[collection.status as keyof typeof byStatus]++;
      });

      return reply.code(200).send({
        date,
        collections,
        summary: {
          totalCollections,
          totalWeight,
          totalValue,
          byStatus
        }
      });
    } catch (error) {
      console.error('Error fetching collections by date:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // GET /collections/:id - Get collection by ID
  fastify.get<{ Params: { id: string } }>('/collections/:id', {
    schema: {
      tags: ['Collections'],
      description: 'Get collection by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: collectionSwaggerSchemas.collection,
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const collection = await prisma.collection.findUnique({
        where: { id: parseInt(id) },
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              address: true
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              description: true,
              unit: true
            }
          }
        }
      });
      
      if (!collection) {
        return reply.code(404).send({ error: 'Collection not found' });
      }
      
      return reply.code(200).send(collection);
    } catch (error) {
      console.error('Error fetching collection:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // POST /collections - Create new collection
  fastify.post<{ Body: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'> }>('/collections', {
    schema: {
      tags: ['Collections'],
      description: 'Create a new collection',
      body: collectionSwaggerSchemas.createCollection,
      response: {
        201: collectionSwaggerSchemas.collection,
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            details: { type: 'object' }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'> }>, reply: FastifyReply) => {
    try {
      const validatedData = collectionSchema.parse(request.body);
      
      // Verificar se o supplier existe
      const supplier = await prisma.supplier.findUnique({
        where: { id: validatedData.supplierId }
      });
      if (!supplier) {
        return reply.code(404).send({ error: 'Supplier not found' });
      }

      // Verificar se o product existe
      const product = await prisma.productType.findUnique({
        where: { id: validatedData.productId }
      });
      if (!product) {
        return reply.code(404).send({ error: 'Product type not found' });
      }

      const newCollection = await prisma.collection.create({
        data: {
          supplierId: validatedData.supplierId,
          status: validatedData.status as any,
          dateTime: new Date(validatedData.dateTime),
          location: validatedData.location,
          productId: validatedData.productId,
          weight: validatedData.weight,
          value: validatedData.value
        },
        include: {
          supplier: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          product: {
            select: {
              id: true,
              name: true,
              unit: true
            }
          }
        }
      });
      
      return reply.code(201).send(newCollection);
    } catch (error: unknown) {
      console.error('Error creating collection:', error);
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // PUT /collections/:id - Update collection
  fastify.put<{ Params: { id: string }; Body: Partial<Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>> }>('/collections/:id', {
    schema: {
      tags: ['Collections'],
      description: 'Update collection by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          supplierId: { type: 'integer' },
          status: { type: 'string', enum: ['Scheduled', 'Confirmed', 'Collected'] },
          dateTime: { type: 'string', format: 'date-time' },
          location: { type: 'string' },
          productId: { type: 'integer' },
          weight: { type: 'number' },
          value: { type: 'number' }
        }
      },
      response: {
        200: collectionSwaggerSchemas.collection,
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>> }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const validatedData = updateCollectionSchema.parse(request.body);
      
      const updateFields = Object.keys(validatedData);
      if (updateFields.length === 0) {
        return reply.code(400).send({ error: 'No fields to update' });
      }

      // Verificar se supplier existe (se foi fornecido)
      if (validatedData.supplierId) {
        const supplier = await prisma.supplier.findUnique({
          where: { id: validatedData.supplierId }
        });
        if (!supplier) {
          return reply.code(404).send({ error: 'Supplier not found' });
        }
      }

      // Verificar se product existe (se foi fornecido)
      if (validatedData.productId) {
        const product = await prisma.productType.findUnique({
          where: { id: validatedData.productId }
        });
        if (!product) {
          return reply.code(404).send({ error: 'Product type not found' });
        }
      }

      try {
        const updatedCollection = await prisma.collection.update({
          where: { id: parseInt(id) },
          data: {
            ...(validatedData.supplierId && { supplierId: validatedData.supplierId }),
            ...(validatedData.status && { status: validatedData.status as any }),
            ...(validatedData.dateTime && { dateTime: new Date(validatedData.dateTime) }),
            ...(validatedData.location && { location: validatedData.location }),
            ...(validatedData.productId && { productId: validatedData.productId }),
            ...(validatedData.weight && { weight: validatedData.weight }),
            ...(validatedData.value && { value: validatedData.value })
          },
          include: {
            supplier: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            product: {
              select: {
                id: true,
                name: true,
                unit: true
              }
            }
          }
        });
        
        return reply.code(200).send(updatedCollection);
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Collection not found' });
        }
        throw prismaError;
      }
    } catch (error: unknown) {
      console.error('Error updating collection:', error);
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // PATCH /collections/:id/status - Update collection status only
  fastify.patch<{ Params: { id: string }; Body: { status: string } }>('/collections/:id/status', {
    schema: {
      tags: ['Collections'],
      description: 'Update collection status only',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      body: collectionSwaggerSchemas.updateStatus,
      response: {
        200: collectionSwaggerSchemas.collection,
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { id: string }; Body: { status: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const validatedData = updateCollectionStatusSchema.parse(request.body);

      try {
        const updatedCollection = await prisma.collection.update({
          where: { id: parseInt(id) },
          data: {
            status: validatedData.status as any
          },
          include: {
            supplier: {
              select: {
                id: true,
                name: true,
                email: true
              }
            },
            product: {
              select: {
                id: true,
                name: true,
                unit: true
              }
            }
          }
        });
        
        return reply.code(200).send(updatedCollection);
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Collection not found' });
        }
        throw prismaError;
      }
    } catch (error: unknown) {
      console.error('Error updating collection status:', error);
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // DELETE /collections/:id - Delete collection
  fastify.delete<{ Params: { id: string } }>('/collections/:id', {
    schema: {
      tags: ['Collections'],
      description: 'Delete collection by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        204: {
          type: 'null'
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      
      try {
        await prisma.collection.delete({
          where: { id: parseInt(id) }
        });
        
        return reply.code(204).send();
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Collection not found' });
        }
        throw prismaError;
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}