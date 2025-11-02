import type { Sale } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../database/prisma';
import { saleSchema, updateSaleSchema } from '../schemas';

const saleSwaggerSchemas = {
  sale: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      clientId: { type: 'integer' },
      productId: { type: 'integer' },
      dateTime: { type: 'string', format: 'date-time' },
      weight: { type: 'number' },
      value: { type: 'number' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      client: {
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
  createSale: {
    type: 'object',
    required: ['clientId', 'productId', 'dateTime', 'weight', 'value'],
    properties: {
      clientId: { type: 'integer' },
      productId: { type: 'integer' },
      dateTime: { type: 'string', format: 'date-time' },
      weight: { type: 'number' },
      value: { type: 'number' }
    }
  },
  salesMetadata: {
    type: 'object',
    properties: {
      sales: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            clientId: { type: 'integer' },
            productId: { type: 'integer' },
            dateTime: { type: 'string', format: 'date-time' },
            weight: { type: 'number' },
            value: { type: 'number' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            client: {
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
        }
      },
      metadata: {
        type: 'object',
        properties: {
          totalSales: { type: 'integer' },
          totalWeight: { type: 'number' },
          totalValue: { type: 'number' }
        }
      }
    }
  }
};

export async function salesRoutes(fastify: FastifyInstance) {
  // GET /sales - List all sales with metadata
  fastify.get('/sales', {
    schema: {
      tags: ['Sales'],
      description: 'Get all sales with metadata (total sales, weight, value)',
      response: {
        200: saleSwaggerSchemas.salesMetadata
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const sales = await prisma.sale.findMany({
        include: {
          client: {
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

      // Calculate metadata
      const totalSales = sales.length;
      const totalWeight = sales.reduce((sum, sale) => sum + sale.weight, 0);
      const totalValue = sales.reduce((sum, sale) => sum + sale.value, 0);

      return reply.code(200).send({
        sales,
        metadata: {
          totalSales,
          totalWeight,
          totalValue
        }
      });
    } catch (error) {
      console.error('Error fetching sales:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // GET /sales/:id - Get sale by ID
  fastify.get<{ Params: { id: string } }>('/sales/:id', {
    schema: {
      tags: ['Sales'],
      description: 'Get sale by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: saleSwaggerSchemas.sale,
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
      const sale = await prisma.sale.findUnique({
        where: { id: parseInt(id) },
        include: {
          client: {
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
      
      if (!sale) {
        return reply.code(404).send({ error: 'Sale not found' });
      }
      
      return reply.code(200).send(sale);
    } catch (error) {
      console.error('Error fetching sale:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // POST /sales - Create new sale
  fastify.post<{ Body: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'> }>('/sales', {
    schema: {
      tags: ['Sales'],
      description: 'Create a new sale',
      body: saleSwaggerSchemas.createSale,
      response: {
        201: saleSwaggerSchemas.sale,
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
  }, async (request: FastifyRequest<{ Body: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'> }>, reply: FastifyReply) => {
    try {
      const validatedData = saleSchema.parse(request.body);
      
      // Verificar se o client existe
      const client = await prisma.client.findUnique({
        where: { id: validatedData.clientId }
      });
      if (!client) {
        return reply.code(404).send({ error: 'Client not found' });
      }

      // Verificar se o product existe
      const product = await prisma.productType.findUnique({
        where: { id: validatedData.productId }
      });
      if (!product) {
        return reply.code(404).send({ error: 'Product type not found' });
      }

      const newSale = await prisma.sale.create({
        data: {
          clientId: validatedData.clientId,
          productId: validatedData.productId,
          dateTime: new Date(validatedData.dateTime),
          weight: validatedData.weight,
          value: validatedData.value
        },
        include: {
          client: {
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
      
      return reply.code(201).send(newSale);
    } catch (error: unknown) {
      console.error('Error creating sale:', error);
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // PUT /sales/:id - Update sale
  fastify.put<{ Params: { id: string }; Body: Partial<Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>> }>('/sales/:id', {
    schema: {
      tags: ['Sales'],
      description: 'Update sale by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          clientId: { type: 'integer' },
          productId: { type: 'integer' },
          dateTime: { type: 'string', format: 'date-time' },
          weight: { type: 'number' },
          value: { type: 'number' }
        }
      },
      response: {
        200: saleSwaggerSchemas.sale,
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
  }, async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>> }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const validatedData = updateSaleSchema.parse(request.body);
      
      const updateFields = Object.keys(validatedData);
      if (updateFields.length === 0) {
        return reply.code(400).send({ error: 'No fields to update' });
      }

      // Verificar se client existe (se foi fornecido)
      if (validatedData.clientId) {
        const client = await prisma.client.findUnique({
          where: { id: validatedData.clientId }
        });
        if (!client) {
          return reply.code(404).send({ error: 'Client not found' });
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
        const updatedSale = await prisma.sale.update({
          where: { id: parseInt(id) },
          data: {
            ...(validatedData.clientId && { clientId: validatedData.clientId }),
            ...(validatedData.productId && { productId: validatedData.productId }),
            ...(validatedData.dateTime && { dateTime: new Date(validatedData.dateTime) }),
            ...(validatedData.weight && { weight: validatedData.weight }),
            ...(validatedData.value && { value: validatedData.value })
          },
          include: {
            client: {
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
        
        return reply.code(200).send(updatedSale);
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Sale not found' });
        }
        throw prismaError;
      }
    } catch (error: unknown) {
      console.error('Error updating sale:', error);
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // DELETE /sales/:id - Delete sale
  fastify.delete<{ Params: { id: string } }>('/sales/:id', {
    schema: {
      tags: ['Sales'],
      description: 'Delete sale by ID',
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
        await prisma.sale.delete({
          where: { id: parseInt(id) }
        });
        
        return reply.code(204).send();
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Sale not found' });
        }
        throw prismaError;
      }
    } catch (error) {
      console.error('Error deleting sale:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}