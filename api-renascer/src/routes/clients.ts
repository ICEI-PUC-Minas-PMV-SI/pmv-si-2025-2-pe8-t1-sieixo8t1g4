import type { Client } from '@prisma/client';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../database/prisma';
import { clientSchema, updateClientSchema } from '../schemas';

const clientSwaggerSchemas = {
  client: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      taxId: { type: 'string' },
      phone: { type: 'string' },
      address: { type: 'string' },
      email: { type: 'string', format: 'email' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  createClient: {
    type: 'object',
    required: ['name', 'taxId', 'phone', 'address', 'email'],
    properties: {
      name: { type: 'string' },
      taxId: { type: 'string' },
      phone: { type: 'string' },
      address: { type: 'string' },
      email: { type: 'string', format: 'email' }
    }
  }
};

export async function clientsRoutes(fastify: FastifyInstance) {
  // GET /clients - List all clients
  fastify.get('/clients', {
    schema: {
      tags: ['Clients'],
      description: 'Get all clients',
      response: {
        200: {
          type: 'array',
          items: clientSwaggerSchemas.client
        }
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const clients = await prisma.client.findMany({
        orderBy: { name: 'asc' }
      });
      return reply.code(200).send(clients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // GET /clients/:id - Get client by ID
  fastify.get<{ Params: { id: string } }>('/clients/:id', {
    schema: {
      tags: ['Clients'],
      description: 'Get client by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        }
      },
      response: {
        200: clientSwaggerSchemas.client,
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
      const client = await prisma.client.findUnique({
        where: { id: parseInt(id) }
      });
      
      if (!client) {
        return reply.code(404).send({ error: 'Client not found' });
      }
      
      return reply.code(200).send(client);
    } catch (error) {
      console.error('Error fetching client:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // POST /clients - Create new client
  fastify.post<{ Body: Omit<Client, 'id' | 'createdAt' | 'updatedAt'> }>('/clients', {
    schema: {
      tags: ['Clients'],
      description: 'Create a new client',
      body: clientSwaggerSchemas.createClient,
      response: {
        201: clientSwaggerSchemas.client,
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
  }, async (request: FastifyRequest<{ Body: Omit<Client, 'id' | 'createdAt' | 'updatedAt'> }>, reply: FastifyReply) => {
    try {
      const validatedData = clientSchema.parse(request.body);
      
      const newClient = await prisma.client.create({
        data: {
          name: validatedData.name,
          taxId: validatedData.taxId,
          phone: validatedData.phone,
          address: validatedData.address,
          email: validatedData.email
        }
      });
      
      return reply.code(201).send(newClient);
    } catch (error: unknown) {
      console.error('Error creating client:', error);
      
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        return reply.code(409).send({ error: 'Tax ID or email already registered' });
      }
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // PUT /clients/:id - Update client
  fastify.put<{ Params: { id: string }; Body: Partial<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>> }>('/clients/:id', {
    schema: {
      tags: ['Clients'],
      description: 'Update client by ID',
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
          email: { type: 'string', format: 'email' }
        }
      },
      response: {
        200: clientSwaggerSchemas.client,
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
  }, async (request: FastifyRequest<{ Params: { id: string }; Body: Partial<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>> }>, reply: FastifyReply) => {
    try {
      const { id } = request.params;
      const validatedData = updateClientSchema.parse(request.body);
      
      const updateFields = Object.keys(validatedData);
      if (updateFields.length === 0) {
        return reply.code(400).send({ error: 'No fields to update' });
      }

      try {
        const updatedClient = await prisma.client.update({
          where: { id: parseInt(id) },
          data: {
            ...(validatedData.name && { name: validatedData.name }),
            ...(validatedData.taxId && { taxId: validatedData.taxId }),
            ...(validatedData.phone && { phone: validatedData.phone }),
            ...(validatedData.address && { address: validatedData.address }),
            ...(validatedData.email && { email: validatedData.email })
          }
        });
        
        return reply.code(200).send(updatedClient);
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Client not found' });
        }
        throw prismaError;
      }
    } catch (error: unknown) {
      console.error('Error updating client:', error);
      
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        return reply.code(409).send({ error: 'Tax ID or email already registered' });
      }
      
      if (error && typeof error === 'object' && 'issues' in error) {
        return reply.code(400).send({ error: 'Invalid data', details: error });
      }
      
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // DELETE /clients/:id - Delete client
  fastify.delete<{ Params: { id: string } }>('/clients/:id', {
    schema: {
      tags: ['Clients'],
      description: 'Delete client by ID',
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
        await prisma.client.delete({
          where: { id: parseInt(id) }
        });
        
        return reply.code(204).send();
      } catch (prismaError: any) {
        if (prismaError.code === 'P2025') {
          return reply.code(404).send({ error: 'Client not found' });
        }
        throw prismaError;
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}