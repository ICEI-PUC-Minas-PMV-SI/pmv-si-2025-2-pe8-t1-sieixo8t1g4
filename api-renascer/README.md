# Renascer API

A complete REST API built with TypeScript, Node.js, and Fastify for managing suppliers, clients, collection points, and product types in a recycling system.

## 🚀 Features

- **Suppliers**: Complete CRUD operations with Name/Company Name, CNPJ/CPF, Phone, Address, Email, Supplier Type (Collector, Agent, Company), Material Type
- **Clients**: Complete CRUD operations with Name/Company Name, CNPJ/CPF, Phone, Address, Email
- **Collection Points**: Complete CRUD operations with Name, Responsible Person, Address, Phone, Email
- **Product Types**: Complete CRUD operations with Name, Description, Unit (g or kg)
- **Collections**: Complete CRUD operations with Supplier (linked to suppliers), Status (Scheduled/Confirmed/Collected), Date & Time, Location, Product (linked to product types), Weight, Value, and dedicated status update endpoint

## 🛠️ Tech Stack

- **Framework**: Fastify (Fast and lightweight web framework)
- **Language**: TypeScript (Type-safe JavaScript)
- **Runtime**: Node.js
- **Database**: SQLite with Prisma ORM (Type-safe database access)
- **Validation**: Zod (TypeScript-first schema validation)
- **Documentation**: Swagger/OpenAPI (Interactive API documentation)

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd api-renascer
```

2. Install dependencies:
```bash
npm install
```

3. Generate Prisma client:
```bash
npm run db:generate
```

4. Run database migrations:
```bash
npm run db:migrate
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

Once the server is running, you can access the interactive Swagger documentation at:
`http://localhost:3000/docs`

## �️ Database Management

### Prisma Commands

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Open Prisma Studio (Database GUI)
npm run db:studio

# Seed database with sample data
npm run db:seed
```

## 🌱 Database Seeding

To populate the database with sample data:

```bash
# New Prisma-based seed with English data
npm run db:seed

# Alternative seed commands (legacy)
npm run seed        # English sample data
npm run seed:pt     # Portuguese sample data  
```

## � API Endpoints

### Suppliers
- `GET /suppliers` - List all suppliers
- `GET /suppliers/:id` - Get supplier by ID
- `POST /suppliers` - Create new supplier
- `PUT /suppliers/:id` - Update supplier
- `DELETE /suppliers/:id` - Delete supplier

### Clients
- `GET /clients` - List all clients
- `GET /clients/:id` - Get client by ID
- `POST /clients` - Create new client
- `PUT /clients/:id` - Update client
- `DELETE /clients/:id` - Delete client

### Collection Points
- `GET /collection-points` - List all collection points
- `GET /collection-points/:id` - Get collection point by ID
- `POST /collection-points` - Create new collection point
- `PUT /collection-points/:id` - Update collection point
- `DELETE /collection-points/:id` - Delete collection point

### Product Types
- `GET /product-types` - List all product types
- `GET /product-types/:id` - Get product type by ID
- `POST /product-types` - Create new product type
- `PUT /product-types/:id` - Update product type
- `DELETE /product-types/:id` - Delete product type

### Collections
- `GET /collections` - List all collections (with supplier and product details)
- `GET /collections/:id` - Get collection by ID (with full supplier and product details)
- `POST /collections` - Create new collection
- `PUT /collections/:id` - Update collection
- `PATCH /collections/:id/status` - Update collection status only
- `DELETE /collections/:id` - Delete collection

## � Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Populate database with sample data
- `npm run db:studio` - Open Prisma Studio (Database GUI)
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
src/
├── routes/                    # API route handlers
├── schemas/                   # Zod validation schemas
├── types/                     # TypeScript type definitions
├── database/
│   ├── prisma.ts             # Prisma client configuration
│   └── seed-*.ts             # Legacy seed files
├── generated/
│   └── prisma/               # Generated Prisma client
└── server.ts                 # Main server configuration

prisma/
├── schema.prisma             # Database schema
├── migrations/               # Database migrations
└── seed.ts                   # Database seeding script
```

## � Database Schema

The application uses Prisma ORM with the following models:

- **Supplier**: Manages recycling material suppliers
- **Client**: Manages customers who purchase recycled materials
- **CollectionPoint**: Manages collection points for materials
- **ProductType**: Manages types of recycled products

All models include automatic `createdAt` and `updatedAt` timestamps.

## 🔒 Validation

All endpoints include input validation using Zod schemas with proper error handling and response codes.

## 📊 Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes:
- 200: Success
- 201: Created
- 204: No Content (for deletions)
- 400: Bad Request (validation errors)
- 404: Not Found
- 409: Conflict (duplicate data)
- 500: Internal Server Error

## 🔄 Database Migrations

When you modify the Prisma schema, create a new migration:

```bash
npx prisma migrate dev --name your_migration_name
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run migrations if schema changes were made
5. Add tests if applicable
6. Submit a pull request

## � License

This project is licensed under the MIT License.