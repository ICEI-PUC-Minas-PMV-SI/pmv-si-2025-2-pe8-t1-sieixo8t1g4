import { z } from 'zod';

export const supplierSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  taxId: z.string().min(11, 'Tax ID must have at least 11 characters'),
  phone: z.string().min(10, 'Phone must have at least 10 characters'),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email('Email must have a valid format'),
  supplierType: z.enum(['Collector', 'Agent', 'Company'], {
    errorMap: () => ({ message: 'Supplier type must be Collector, Agent or Company' })
  }),
  materialType: z.string().min(1, 'Material type is required'),
});

export const updateSupplierSchema = supplierSchema.partial();

export const clientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  taxId: z.string().min(11, 'Tax ID must have at least 11 characters'),
  phone: z.string().min(10, 'Phone must have at least 10 characters'),
  address: z.string().min(1, 'Address is required'),
  email: z.string().email('Email must have a valid format'),
});

export const updateClientSchema = clientSchema.partial();

export const collectionPointSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  responsible: z.string().min(1, 'Responsible is required'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(10, 'Phone must have at least 10 characters'),
  email: z.string().email('Email must have a valid format'),
});

export const updateCollectionPointSchema = collectionPointSchema.partial();

export const productTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  unit: z.enum(['g', 'kg'], {
    errorMap: () => ({ message: 'Unit must be g or kg' })
  }),
});

export const updateProductTypeSchema = productTypeSchema.partial();

export const collectionSchema = z.object({
  supplierId: z.number().int().positive('Supplier ID must be a positive integer'),
  status: z.enum(['Scheduled', 'Confirmed', 'Collected'], {
    errorMap: () => ({ message: 'Status must be Scheduled, Confirmed or Collected' })
  }).optional().default('Scheduled'),
  dateTime: z.string().datetime('Date and time must be in ISO format'),
  location: z.string().min(1, 'Location is required'),
  productId: z.number().int().positive('Product ID must be a positive integer'),
  weight: z.number().positive('Weight must be a positive number'),
  value: z.number().positive('Value must be a positive number'),
});

export const updateCollectionSchema = collectionSchema.partial();

export const updateCollectionStatusSchema = z.object({
  status: z.enum(['Scheduled', 'Confirmed', 'Collected'], {
    errorMap: () => ({ message: 'Status must be Scheduled, Confirmed or Collected' })
  }),
});

export const saleSchema = z.object({
  clientId: z.number().int().positive('Client ID must be a positive integer'),
  productId: z.number().int().positive('Product ID must be a positive integer'),
  dateTime: z.string().datetime('Date and time must be in ISO format'),
  weight: z.number().positive('Weight must be a positive number'),
  value: z.number().positive('Value must be a positive number'),
});

export const updateSaleSchema = saleSchema.partial();