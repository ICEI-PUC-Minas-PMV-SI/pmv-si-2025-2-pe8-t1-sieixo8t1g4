import type { CollectionPoint } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../database/prisma';
import { collectionPointSchema, updateCollectionPointSchema } from '../schemas';

const collectionPointSwaggerSchemas = {
  collectionPoint: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      responsible: { type: 'string' },
      address: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string', format: 'email' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  createCollectionPoint: {
    type: 'object',
    required: ['name', 'responsible', 'address', 'phone', 'email'],
    properties: {
      name: { type: 'string' },
      responsible: { type: 'string' },
      address: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string', format: 'email' }
    }
  }
};

export async function collectionPointsRoutes(fastify: FastifyInstance) {
  // GET /collection-points - List all collection points
  fastify.get('/collection-points', {
    schema: {
      tags: ['Collection Points'],
      description: 'Get all collection points',
      response: {
        200: {
          type: 'array',
          items: collectionPointSwaggerSchemas.collectionPoint
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const collectionPoints = await prisma.collectionPoint.findMany({
        orderBy: { id: 'desc' }
      });
      return reply.code(200).send(collectionPoints);
    } catch (error) {
      console.error('Error fetching collection points:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // GET /collection-points/:id - Get collection point by ID
  fastify.get<{ Params: { id: string } }>('/collection-points/:id', {
    schema: {
      tags: ['Collection Points'],
      description: 'Get collection point by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: collectionPointSwaggerSchemas.collectionPoint,
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
      const collectionPoint = await prisma.collectionPoint.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!collectionPoint) {
        return reply.code(404).send({ error: 'Collection point not found' });
      }
      
      return reply.code(200).send(collectionPoint);
    } catch (error) {
      console.error('Error fetching collection point:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // POST /collection-points - Create new collection point
  fastify.post<{ Body: Omit<CollectionPoint, 'id' | 'createdAt' | 'updatedAt'> }>('/collection-points', {
    schema: {
      tags: ['Collection Points'],
      description: 'Create a new collection point',
      body: collectionPointSwaggerSchemas.createCollectionPoint,
      response: {
        201: collectionPointSwaggerSchemas.collectionPoint,
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            details: { type: 'object' }
          }
        },
        409: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, async (request: FastifyRequest<{ Body: Omit<CollectionPoint, 'id' | 'createdAt' | 'updatedAt'> }>, reply: FastifyReply) => {
    try {
      const validatedData = collectionPointSchema.parse(request.body);
      
      const newCollectionPoint = await prisma.collectionPoint.create({
        data: {
          name: validatedData.name,
          responsible: validatedData.responsible,
          address: validatedData.address,
          phone: validatedData.phone,
          email: validatedData.email
        }
      });
      
      return reply.code(201).send(newCollectionPoint);
    } catch (error: unknown) {
      console.error('Error creating collection point:', error);
      
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        return reply.code(409).send({ error: 'Email already registered' });
      }
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // PUT /collection-points/:id - Update collection point
  fastify.put<{ Params: { id: string }; Body: Partial<Omit<CollectionPoint, 'id' | 'createdAt' | 'updatedAt'>> }>('/collection-points/:id', {
    schema: {
      tags: ['Collection Points'],
      description: 'Update collection point by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          responsible: { type: 'string' },
          address: { type: 'string' },
          phone: { type: 'string' },
          email: { type: 'string', format: 'email' }
        }
      },
      response: {
        200: collectionPointSwaggerSchemas.collectionPoint,
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
  }, async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<Omit<CollectionPoint, 'id' | 'createdAt' | 'updatedAt'>> }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const validatedData = updateCollectionPointSchema.parse(request.body);
      
      const updateFields = Object.keys(validatedData);
      if (updateFields.length === 0) {
        return reply.code(400).send({ error: 'No fields to update' });
      }

      try {
        const updatedCollectionPoint = await prisma.collectionPoint.update({
          where: { id: parseInt(id) },
          data: {
            ...(validatedData.name && { name: validatedData.name }),
            ...(validatedData.responsible && { responsible: validatedData.responsible }),
            ...(validatedData.address && { address: validatedData.address }),
            ...(validatedData.phone && { phone: validatedData.phone }),
            ...(validatedData.email && { email: validatedData.email })
          }
        });
        
        return reply.code(200).send(updatedCollectionPoint);
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Collection point not found' });
        }
        throw prismaError;
      }
    } catch (error: unknown) {
      console.error('Error updating collection point:', error);
      
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        return reply.code(409).send({ error: 'Email already registered' });
      }
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // DELETE /collection-points/:id - Delete collection point
  fastify.delete<{ Params: { id: string } }>('/collection-points/:id', {
    schema: {
      tags: ['Collection Points'],
      description: 'Delete collection point by ID',
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
        await prisma.collectionPoint.delete({
          where: { id: parseInt(id) }
        });
        
        return reply.code(204).send();
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Collection point not found' });
        }
        throw prismaError;
      }
    } catch (error) {
      console.error('Error deleting collection point:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}