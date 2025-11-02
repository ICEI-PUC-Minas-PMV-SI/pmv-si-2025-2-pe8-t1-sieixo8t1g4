import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import Fastify from 'fastify';

import { clientsRoutes } from './routes/clients';
import { collectionPointsRoutes } from './routes/collection-points';
import { collectionsRoutes } from './routes/collections';
import { dashboardRoutes } from './routes/dashboard';
import { productTypesRoutes } from './routes/product-types';
import { salesRoutes } from './routes/sales';
import { suppliersRoutes } from './routes/suppliers';

const fastify = Fastify({ 
  logger: true 
});

// Register Swagger
fastify.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Renascer API',
      description: 'RESTful API for managing suppliers, clients, collection points, product types, collections, sales and dashboard analytics',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
  }
});

fastify.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
});

// Register CORS
fastify.register(cors, {
  origin: true
});

// Register routes
fastify.register(suppliersRoutes);
fastify.register(clientsRoutes);
fastify.register(collectionPointsRoutes);
fastify.register(collectionsRoutes);
fastify.register(productTypesRoutes);
fastify.register(salesRoutes);
fastify.register(dashboardRoutes);

// Health check route
fastify.get('/', async (_, reply) => {
  return reply.code(200).send({ 
    message: 'Renascer API - Suppliers and Clients Management System',
    version: '1.0.0',
    status: 'ok',
    documentation: '/docs'
  });
});

const start = async () => {
  try {
    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    const HOST = process.env.HOST || 'localhost';
    
    await fastify.listen({ port: PORT, host: HOST });
    console.log(`🚀 Server running at http://${HOST}:${PORT}`);
    console.log(`📚 API Documentation available at http://${HOST}:${PORT}/docs`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();