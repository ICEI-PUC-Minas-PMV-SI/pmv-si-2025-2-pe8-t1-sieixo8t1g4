import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../database/prisma';

const dashboardSwaggerSchemas = {
  indicators: {
    type: 'object',
    properties: {
      totalScheduledWeight: { type: 'number', description: 'Total weight of scheduled collections in kg' },
      totalCollectedWeight: { type: 'number', description: 'Total weight of collected materials in kg' },
      totalSoldWeight: { type: 'number', description: 'Total weight of sold materials in kg' },
      totalSalesValue: { type: 'number', description: 'Total sales value' }
    }
  },
  monthlyMovement: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        month: { type: 'string', description: 'Month in YYYY-MM format' },
        collectionsWeight: { type: 'number', description: 'Total collections weight in kg' },
        salesWeight: { type: 'number', description: 'Total sales weight in kg' },
        collectionsValue: { type: 'number', description: 'Total collections value' },
        salesValue: { type: 'number', description: 'Total sales value' }
      }
    }
  },
  collectionsBySupplier: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        supplierId: { type: 'integer' },
        supplierName: { type: 'string' },
        totalCollections: { type: 'integer' },
        totalWeight: { type: 'number' },
        totalValue: { type: 'number' }
      }
    }
  },
  salesByProductType: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        productId: { type: 'integer' },
        productName: { type: 'string' },
        unit: { type: 'string' },
        totalWeight: { type: 'number', description: 'Total weight sold in the product unit' },
        totalWeightInKg: { type: 'number', description: 'Total weight sold converted to kg' },
        totalValue: { type: 'number' },
        totalSales: { type: 'integer' }
      }
    }
  }
};

export async function dashboardRoutes(fastify: FastifyInstance) {
  // GET /dashboard/indicators - Main dashboard indicators
  fastify.get('/dashboard/indicators', {
    schema: {
      tags: ['Dashboard'],
      description: 'Get main dashboard indicators',
      response: {
        200: dashboardSwaggerSchemas.indicators
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Weight of scheduled collections (status = 'Scheduled')
      const scheduledCollections = await prisma.collection.aggregate({
        where: { status: 'Scheduled' },
        _sum: { weight: true }
      });

      // Weight of collected materials (status = 'Collected')
      const collectedMaterials = await prisma.collection.aggregate({
        where: { status: 'Collected' },
        _sum: { weight: true }
      });

      // Total weight and value of sales
      const salesData = await prisma.sale.aggregate({
        _sum: { 
          weight: true,
          value: true 
        }
      });

      // Convert weights to kg (considering product units)
      const scheduledWeightData = await prisma.collection.findMany({
        where: { status: 'Scheduled' },
        include: { product: true }
      });

      const collectedWeightData = await prisma.collection.findMany({
        where: { status: 'Collected' },
        include: { product: true }
      });

      const salesWeightData = await prisma.sale.findMany({
        include: { product: true }
      });

      // Helper function to convert weight to kg
      const convertToKg = (weight: number, unit: string): number => {
        return unit === 'g' ? weight / 1000 : weight;
      };

      const totalScheduledWeight = scheduledWeightData.reduce((sum, item) => 
        sum + convertToKg(item.weight, item.product.unit), 0
      );

      const totalCollectedWeight = collectedWeightData.reduce((sum, item) => 
        sum + convertToKg(item.weight, item.product.unit), 0
      );

      const totalSoldWeight = salesWeightData.reduce((sum, item) => 
        sum + convertToKg(item.weight, item.product.unit), 0
      );

      return reply.code(200).send({
        totalScheduledWeight: Math.round(totalScheduledWeight * 100) / 100,
        totalCollectedWeight: Math.round(totalCollectedWeight * 100) / 100,
        totalSoldWeight: Math.round(totalSoldWeight * 100) / 100,
        totalSalesValue: salesData._sum.value || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard indicators:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // GET /dashboard/monthly-movement - Monthly movement data
  fastify.get('/dashboard/monthly-movement', {
    schema: {
      tags: ['Dashboard'],
      description: 'Get monthly movement data for collections and sales',
      response: {
        200: dashboardSwaggerSchemas.monthlyMovement
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Get collections data grouped by month
      const collections = await prisma.collection.findMany({
        include: { product: true },
        orderBy: { dateTime: 'asc' }
      });

      // Get sales data grouped by month
      const sales = await prisma.sale.findMany({
        include: { product: true },
        orderBy: { dateTime: 'asc' }
      });

      // Helper function to convert weight to kg
      const convertToKg = (weight: number, unit: string): number => {
        return unit === 'g' ? weight / 1000 : weight;
      };

      // Group data by month
      const monthlyData: { [key: string]: any } = {};

      // Process collections
      collections.forEach(collection => {
        const month = collection.dateTime.toISOString().slice(0, 7); // YYYY-MM format
        if (!monthlyData[month]) {
          monthlyData[month] = {
            month,
            collectionsWeight: 0,
            salesWeight: 0,
            collectionsValue: 0,
            salesValue: 0
          };
        }
        monthlyData[month].collectionsWeight += convertToKg(collection.weight, collection.product.unit);
        monthlyData[month].collectionsValue += collection.value;
      });

      // Process sales
      sales.forEach(sale => {
        const month = sale.dateTime.toISOString().slice(0, 7); // YYYY-MM format
        if (!monthlyData[month]) {
          monthlyData[month] = {
            month,
            collectionsWeight: 0,
            salesWeight: 0,
            collectionsValue: 0,
            salesValue: 0
          };
        }
        monthlyData[month].salesWeight += convertToKg(sale.weight, sale.product.unit);
        monthlyData[month].salesValue += sale.value;
      });

      // Convert to array and round numbers
      const result = Object.values(monthlyData).map((data: any) => ({
        ...data,
        collectionsWeight: Math.round(data.collectionsWeight * 100) / 100,
        salesWeight: Math.round(data.salesWeight * 100) / 100
      }));

      return reply.code(200).send(result);
    } catch (error) {
      console.error('Error fetching monthly movement:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // GET /dashboard/collections-by-supplier - Collections grouped by supplier
  fastify.get('/dashboard/collections-by-supplier', {
    schema: {
      tags: ['Dashboard'],
      description: 'Get number of collections grouped by supplier',
      response: {
        200: dashboardSwaggerSchemas.collectionsBySupplier
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const collectionsData = await prisma.collection.groupBy({
        by: ['supplierId'],
        _count: {
          id: true
        },
        _sum: {
          weight: true,
          value: true
        }
      });

      // Get supplier details
      const supplierIds = collectionsData.map(data => data.supplierId);
      const suppliers = await prisma.supplier.findMany({
        where: { id: { in: supplierIds } },
        select: { id: true, name: true }
      });

      // Create supplier lookup map
      const supplierMap = suppliers.reduce((map, supplier) => {
        map[supplier.id] = supplier.name;
        return map;
      }, {} as { [key: number]: string });

      // Combine data with supplier names
      const result = collectionsData.map(data => ({
        supplierId: data.supplierId,
        supplierName: supplierMap[data.supplierId],
        totalCollections: data._count.id,
        totalWeight: data._sum.weight || 0,
        totalValue: data._sum.value || 0
      }));

      // Sort by total collections descending
      result.sort((a, b) => b.totalCollections - a.totalCollections);

      return reply.code(200).send(result);
    } catch (error) {
      console.error('Error fetching collections by supplier:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // GET /dashboard/sales-by-product-type - Sales data grouped by product type
  fastify.get('/dashboard/sales-by-product-type', {
    schema: {
      tags: ['Dashboard'],
      description: 'Get sales data grouped by product type (for weight chart)',
      response: {
        200: dashboardSwaggerSchemas.salesByProductType
      }
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const salesData = await prisma.sale.groupBy({
        by: ['productId'],
        _count: {
          id: true
        },
        _sum: {
          weight: true,
          value: true
        }
      });

      // Get product details
      const productIds = salesData.map(data => data.productId);
      const products = await prisma.productType.findMany({
        where: { id: { in: productIds } },
        select: { id: true, name: true, unit: true }
      });

      // Create product lookup map
      const productMap = products.reduce((map, product) => {
        map[product.id] = product;
        return map;
      }, {} as { [key: number]: any });

      // Helper function to convert weight to kg
      const convertToKg = (weight: number, unit: string): number => {
        return unit === 'g' ? weight / 1000 : weight;
      };

      // Combine data with product details and convert weights
      const result = salesData.map(data => {
        const product = productMap[data.productId];
        const totalWeight = data._sum.weight || 0;
        const totalWeightInKg = convertToKg(totalWeight, product.unit);

        return {
          productId: data.productId,
          productName: product.name,
          unit: product.unit,
          totalWeight: Math.round(totalWeight * 100) / 100,
          totalWeightInKg: Math.round(totalWeightInKg * 100) / 100,
          totalValue: data._sum.value || 0,
          totalSales: data._count.id
        };
      });

      // Sort by total weight in kg descending
      result.sort((a, b) => b.totalWeightInKg - a.totalWeightInKg);

      return reply.code(200).send(result);
    } catch (error) {
      console.error('Error fetching sales by product type:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}