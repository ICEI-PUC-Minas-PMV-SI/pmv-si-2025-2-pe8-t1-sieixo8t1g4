import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.sale.deleteMany(); // Delete sales first due to foreign keys
  await prisma.collection.deleteMany(); // Delete collections first due to foreign keys
  await prisma.supplier.deleteMany();
  await prisma.client.deleteMany();
  await prisma.collectionPoint.deleteMany();
  await prisma.productType.deleteMany();

  // Seed Suppliers
  console.log('Creating suppliers...');
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'EcoRecycle Solutions',
      taxId: '12.345.678/0001-99',
      phone: '(11) 98765-4321',
      address: '123 Green Street, São Paulo, SP',
      email: 'contact@ecorecycle.com',
      supplierType: 'Company',
      materialType: 'Plastic, Paper, Metal'
    }
  });

  const supplier2 = await prisma.supplier.create({
    data: {
      name: 'João Silva',
      taxId: '123.456.789-00',
      phone: '(11) 91234-5678',
      address: '456 Collector Ave, São Paulo, SP',
      email: 'joao.silva@email.com',
      supplierType: 'Collector',
      materialType: 'Paper, Cardboard'
    }
  });

  const supplier3 = await prisma.supplier.create({
    data: {
      name: 'Maria Santos',
      taxId: '987.654.321-11',
      phone: '(11) 92345-6789',
      address: '789 Recycler Street, São Paulo, SP',
      email: 'maria.santos@email.com',
      supplierType: 'Agent',
      materialType: 'Glass, Metal'
    }
  });

  const supplier4 = await prisma.supplier.create({
    data: {
      name: 'Green Materials Inc.',
      taxId: '98.765.432/0001-88',
      phone: '(11) 93456-7890',
      address: '321 Industrial Park, São Paulo, SP',
      email: 'info@greenmaterials.com',
      supplierType: 'Company',
      materialType: 'Electronic waste, Batteries'
    }
  });

  const suppliersCount = 4;

  // Seed Clients
  console.log('Creating clients...');
  const clients = await prisma.client.createMany({
    data: [
      {
        name: 'Tech Manufacturing Corp',
        taxId: '11.222.333/0001-44',
        phone: '(11) 94567-8901',
        address: '100 Tech Boulevard, São Paulo, SP',
        email: 'procurement@techmanufacturing.com'
      },
      {
        name: 'Sustainable Packaging Ltd',
        taxId: '22.333.444/0001-55',
        phone: '(11) 95678-9012',
        address: '200 Package Street, São Paulo, SP',
        email: 'orders@sustainablepackaging.com'
      },
      {
        name: 'Ana Costa',
        taxId: '555.666.777-88',
        phone: '(11) 96789-0123',
        address: '300 Home Street, São Paulo, SP',
        email: 'ana.costa@email.com'
      },
      {
        name: 'Roberto Oliveira',
        taxId: '666.777.888-99',
        phone: '(11) 97890-1234',
        address: '400 Business Avenue, São Paulo, SP',
        email: 'roberto.oliveira@email.com'
      }
    ]
  });

  // Seed Collection Points
  console.log('Creating collection points...');
  const collectionPoints = await prisma.collectionPoint.createMany({
    data: [
      {
        name: 'Central Recycling Hub',
        responsible: 'Carlos Manager',
        address: '500 Central Plaza, São Paulo, SP',
        phone: '(11) 98901-2345',
        email: 'central@recyclehub.com'
      },
      {
        name: 'North Zone Collection',
        responsible: 'Patricia Supervisor',
        address: '600 North Street, São Paulo, SP',
        phone: '(11) 99012-3456',
        email: 'north@collection.com'
      },
      {
        name: 'South Side Depot',
        responsible: 'Fernando Coordinator',
        address: '700 South Road, São Paulo, SP',
        phone: '(11) 90123-4567',
        email: 'south@depot.com'
      },
      {
        name: 'East District Center',
        responsible: 'Lucia Director',
        address: '800 East Avenue, São Paulo, SP',
        phone: '(11) 91234-5678',
        email: 'east@center.com'
      }
    ]
  });

  // Seed Product Types
  console.log('Creating product types...');
  const product1 = await prisma.productType.create({
    data: {
      name: 'Recycled Plastic Pellets',
      description: 'High-quality recycled plastic pellets suitable for manufacturing',
      unit: 'kg'
    }
  });

  const product2 = await prisma.productType.create({
    data: {
      name: 'Recycled Paper Pulp',
      description: 'Clean recycled paper pulp for paper production',
      unit: 'kg'
    }
  });

  const product3 = await prisma.productType.create({
    data: {
      name: 'Aluminum Sheets',
      description: 'Recycled aluminum sheets for industrial use',
      unit: 'kg'
    }
  });

  const product4 = await prisma.productType.create({
    data: {
      name: 'Glass Cullet',
      description: 'Crushed recycled glass for glass manufacturing',
      unit: 'kg'
    }
  });

  const product5 = await prisma.productType.create({
    data: {
      name: 'Copper Wire',
      description: 'Recovered copper wire from electronic waste',
      unit: 'g'
    }
  });

  const productTypesCount = 5;

  // Seed Collections
  console.log('Creating collections...');
  const collection1 = await prisma.collection.create({
    data: {
      supplierId: supplier1.id,
      status: 'Scheduled',
      dateTime: new Date('2025-11-01T09:00:00Z'),
      location: 'Industrial District, São Paulo',
      productId: product1.id,
      weight: 250.5,
      value: 1250.00
    }
  });

  const collection2 = await prisma.collection.create({
    data: {
      supplierId: supplier2.id,
      status: 'Confirmed',
      dateTime: new Date('2025-10-30T14:30:00Z'),
      location: 'Downtown Collection Center',
      productId: product2.id,
      weight: 180.0,
      value: 540.00
    }
  });

  const collection3 = await prisma.collection.create({
    data: {
      supplierId: supplier3.id,
      status: 'Collected',
      dateTime: new Date('2025-10-28T11:15:00Z'),
      location: 'North Zone Warehouse',
      productId: product3.id,
      weight: 75.2,
      value: 2256.00
    }
  });

  const collection4 = await prisma.collection.create({
    data: {
      supplierId: supplier4.id,
      status: 'Confirmed',
      dateTime: new Date('2025-11-02T16:00:00Z'),
      location: 'Electronic Waste Facility',
      productId: product5.id,
      weight: 15.8,
      value: 790.00
    }
  });

  const collection5 = await prisma.collection.create({
    data: {
      supplierId: supplier1.id,
      status: 'Scheduled',
      dateTime: new Date('2025-11-05T08:30:00Z'),
      location: 'Central Processing Plant',
      productId: product4.id,
      weight: 320.0,
      value: 960.00
    }
  });

  const collectionsCount = 5;

  // Get created clients for sales
  const createdClients = await prisma.client.findMany();

  // Seed Sales
  console.log('Creating sales...');
  const sale1 = await prisma.sale.create({
    data: {
      clientId: createdClients[0].id, // Tech Manufacturing Corp
      productId: product1.id, // Recycled Plastic Pellets
      dateTime: new Date('2025-10-25T10:00:00Z'),
      weight: 150.0,
      value: 900.00
    }
  });

  const sale2 = await prisma.sale.create({
    data: {
      clientId: createdClients[1].id, // Sustainable Packaging Ltd
      productId: product2.id, // Recycled Paper Pulp
      dateTime: new Date('2025-10-26T15:30:00Z'),
      weight: 200.5,
      value: 1002.50
    }
  });

  const sale3 = await prisma.sale.create({
    data: {
      clientId: createdClients[0].id, // Tech Manufacturing Corp
      productId: product3.id, // Aluminum Sheets
      dateTime: new Date('2025-10-27T09:15:00Z'),
      weight: 50.8,
      value: 2032.00
    }
  });

  const sale4 = await prisma.sale.create({
    data: {
      clientId: createdClients[2].id, // Ana Costa
      productId: product4.id, // Glass Cullet
      dateTime: new Date('2025-10-28T14:45:00Z'),
      weight: 100.0,
      value: 300.00
    }
  });

  const sale5 = await prisma.sale.create({
    data: {
      clientId: createdClients[3].id, // Roberto Oliveira
      productId: product5.id, // Copper Wire
      dateTime: new Date('2025-10-29T11:20:00Z'),
      weight: 5.2, // 5.2g of copper wire
      value: 520.00
    }
  });

  const sale6 = await prisma.sale.create({
    data: {
      clientId: createdClients[1].id, // Sustainable Packaging Ltd
      productId: product1.id, // Recycled Plastic Pellets
      dateTime: new Date('2025-10-30T16:30:00Z'),
      weight: 300.0,
      value: 1800.00
    }
  });

  const salesCount = 6;

  console.log('✅ Database seeding completed successfully!');
  console.log(`📊 Created: ${suppliersCount} suppliers, ${clients.count} clients, ${collectionPoints.count} collection points, ${productTypesCount} product types, ${collectionsCount} collections, ${salesCount} sales`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });