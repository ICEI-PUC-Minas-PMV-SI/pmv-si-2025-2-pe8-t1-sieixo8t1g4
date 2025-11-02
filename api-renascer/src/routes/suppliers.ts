import type { Supplier } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../database/prisma';
import { supplierSchema, updateSupplierSchema } from '../schemas';

const supplierSwaggerSchemas = {
  supplier: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      taxId: { type: 'string' },
      phone: { type: 'string' },
      address: { type: 'string' },
      email: { type: 'string', format: 'email' },
      supplierType: { type: 'string', enum: ['Collector', 'Agent', 'Company'] },
      materialType: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  createSupplier: {
    type: 'object',
    required: ['name', 'taxId', 'phone', 'address', 'email', 'supplierType', 'materialType'],
    properties: {
      name: { type: 'string' },
      taxId: { type: 'string' },
      phone: { type: 'string' },
      address: { type: 'string' },
      email: { type: 'string', format: 'email' },
      supplierType: { type: 'string', enum: ['Collector', 'Agent', 'Company'] },
      materialType: { type: 'string' }
    }
  }
};

export async function suppliersRoutes(fastify: FastifyInstance) {
  // GET /suppliers - List all suppliers
  fastify.get('/suppliers', {
    schema: {
      tags: ['Suppliers'],
      description: 'Get all suppliers',
      response: {
        200: {
          type: 'array',
          items: supplierSwaggerSchemas.supplier
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const suppliers = await prisma.supplier.findMany({
        orderBy: { id: 'desc' }
      });
      return reply.code(200).send(suppliers);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // GET /suppliers/:id - Get supplier by ID
  fastify.get<{ Params: { id: string } }>('/suppliers/:id', {
    schema: {
      tags: ['Suppliers'],
      description: 'Get supplier by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: supplierSwaggerSchemas.supplier,
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
      const supplier = await prisma.supplier.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!supplier) {
        return reply.code(404).send({ error: 'Supplier not found' });
      }
      
      return reply.code(200).send(supplier);
    } catch (error) {
      console.error('Error fetching supplier:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // POST /suppliers - Create new supplier
  fastify.post<{ Body: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'> }>('/suppliers', {
    schema: {
      tags: ['Suppliers'],
      description: 'Create a new supplier',
      body: supplierSwaggerSchemas.createSupplier,
      response: {
        201: supplierSwaggerSchemas.supplier,
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
  }, async (request: FastifyRequest<{ Body: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'> }>, reply: FastifyReply) => {
    try {
      const validatedData = supplierSchema.parse(request.body);
      
      const newSupplier = await prisma.supplier.create({
        data: {
          name: validatedData.name,
          taxId: validatedData.taxId,
          phone: validatedData.phone,
          address: validatedData.address,
          email: validatedData.email,
          supplierType: validatedData.supplierType as any,
          materialType: validatedData.materialType
        }
      });
      
      return reply.code(201).send(newSupplier);
    } catch (error: unknown) {
      console.error('Error creating supplier:', error);
      
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        return reply.code(409).send({ error: 'Tax ID or email already registered' });
      }
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // PUT /suppliers/:id - Update supplier
  fastify.put<{ Params: { id: string }; Body: Partial<Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>> }>('/suppliers/:id', {
    schema: {
      tags: ['Suppliers'],
      description: 'Update supplier by ID',
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
          taxId: { type: 'string' },
          phone: { type: 'string' },
          address: { type: 'string' },
          email: { type: 'string', format: 'email' },
          supplierType: { type: 'string', enum: ['Collector', 'Agent', 'Company'] },
          materialType: { type: 'string' }
        }
      },
      response: {
        200: supplierSwaggerSchemas.supplier,
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
  }, async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>> }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const validatedData = updateSupplierSchema.parse(request.body);
      
      const updateFields = Object.keys(validatedData);
      if (updateFields.length === 0) {
        return reply.code(400).send({ error: 'No fields to update' });
      }

      try {
        const updatedSupplier = await prisma.supplier.update({
          where: { id: parseInt(id) },
          data: {
            ...(validatedData.name && { name: validatedData.name }),
            ...(validatedData.taxId && { taxId: validatedData.taxId }),
            ...(validatedData.phone && { phone: validatedData.phone }),
            ...(validatedData.address && { address: validatedData.address }),
            ...(validatedData.email && { email: validatedData.email }),
            ...(validatedData.supplierType && { supplierType: validatedData.supplierType as any }),
            ...(validatedData.materialType && { materialType: validatedData.materialType })
          }
        });
        
        return reply.code(200).send(updatedSupplier);
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Supplier not found' });
        }
        throw prismaError;
      }
    } catch (error: unknown) {
      console.error('Error updating supplier:', error);
      
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        return reply.code(409).send({ error: 'Tax ID or email already registered' });
      }
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // DELETE /suppliers/:id - Delete supplier
  fastify.delete<{ Params: { id: string } }>('/suppliers/:id', {
    schema: {
      tags: ['Suppliers'],
      description: 'Delete supplier by ID',
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
        await prisma.supplier.delete({
          where: { id: parseInt(id) }
        });
        
        return reply.code(204).send();
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Supplier not found' });
        }
        throw prismaError;
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}