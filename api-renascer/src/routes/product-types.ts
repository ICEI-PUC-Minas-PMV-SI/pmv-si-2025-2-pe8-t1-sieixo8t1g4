import type { ProductType } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../database/prisma';
import { productTypeSchema, updateProductTypeSchema } from '../schemas';

const productTypeSwaggerSchemas = {
  productType: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      description: { type: 'string' },
      unit: { type: 'string', enum: ['g', 'kg'] },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  createProductType: {
    type: 'object',
    required: ['name', 'description', 'unit'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      unit: { type: 'string', enum: ['g', 'kg'] }
    }
  }
};

export async function productTypesRoutes(fastify: FastifyInstance) {
  // GET /product-types - List all product types
  fastify.get('/product-types', {
    schema: {
      tags: ['Product Types'],
      description: 'Get all product types',
      response: {
        200: {
          type: 'array',
          items: productTypeSwaggerSchemas.productType
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const productTypes = await prisma.productType.findMany({
        orderBy: { id: 'desc' }
      });
      return reply.code(200).send(productTypes);
    } catch (error) {
      console.error('Error fetching product types:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // GET /product-types/:id - Get product type by ID
  fastify.get<{ Params: { id: string } }>('/product-types/:id', {
    schema: {
      tags: ['Product Types'],
      description: 'Get product type by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: productTypeSwaggerSchemas.productType,
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
      const productType = await prisma.productType.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!productType) {
        return reply.code(404).send({ error: 'Product type not found' });
      }
      
      return reply.code(200).send(productType);
    } catch (error) {
      console.error('Error fetching product type:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // POST /product-types - Create new product type
  fastify.post<{ Body: Omit<ProductType, 'id' | 'createdAt' | 'updatedAt'> }>('/product-types', {
    schema: {
      tags: ['Product Types'],
      description: 'Create a new product type',
      body: productTypeSwaggerSchemas.createProductType,
      response: {
        201: productTypeSwaggerSchemas.productType,
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
  }, async (request: FastifyRequest<{ Body: Omit<ProductType, 'id' | 'createdAt' | 'updatedAt'> }>, reply: FastifyReply) => {
    try {
      const validatedData = productTypeSchema.parse(request.body);
      
      const newProductType = await prisma.productType.create({
        data: {
          name: validatedData.name,
          description: validatedData.description,
          unit: validatedData.unit as any
        }
      });
      
      return reply.code(201).send(newProductType);
    } catch (error: unknown) {
      console.error('Error creating product type:', error);
      
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        return reply.code(409).send({ error: 'Name already registered' });
      }
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // PUT /product-types/:id - Update product type
  fastify.put<{ Params: { id: string }; Body: Partial<Omit<ProductType, 'id' | 'createdAt' | 'updatedAt'>> }>('/product-types/:id', {
    schema: {
      tags: ['Product Types'],
      description: 'Update product type by ID',
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
          description: { type: 'string' },
          unit: { type: 'string', enum: ['g', 'kg'] }
        }
      },
      response: {
        200: productTypeSwaggerSchemas.productType,
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
  }, async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<Omit<ProductType, 'id' | 'createdAt' | 'updatedAt'>> }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const validatedData = updateProductTypeSchema.parse(request.body);
      
      const updateFields = Object.keys(validatedData);
      if (updateFields.length === 0) {
        return reply.code(400).send({ error: 'No fields to update' });
      }

      try {
        const updatedProductType = await prisma.productType.update({
          where: { id: parseInt(id) },
          data: {
            ...(validatedData.name && { name: validatedData.name }),
            ...(validatedData.description && { description: validatedData.description }),
            ...(validatedData.unit && { unit: validatedData.unit as any })
          }
        });
        
        return reply.code(200).send(updatedProductType);
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Product type not found' });
        }
        throw prismaError;
      }
    } catch (error: unknown) {
      console.error('Error updating product type:', error);
      
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        return reply.code(409).send({ error: 'Name already registered' });
      }
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // DELETE /product-types/:id - Delete product type
  fastify.delete<{ Params: { id: string } }>('/product-types/:id', {
    schema: {
      tags: ['Product Types'],
      description: 'Delete product type by ID',
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
        await prisma.productType.delete({
          where: { id: parseInt(id) }
        });
        
        return reply.code(204).send();
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Product type not found' });
        }
        throw prismaError;
      }
    } catch (error) {
      console.error('Error deleting product type:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}