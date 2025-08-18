import { CategoryName, Order, OrderItem } from "@prisma/client";

import { OrderStatus } from "@prisma/client";

import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
});

export interface CartItems {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

export type OrderWithItems = Order & {
  items?: OrderItem[];
};

export interface IOrders {
  id: string;
  status: OrderStatus;
  created_at: Date;
  total_price: number;
  items: number;
}

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const profileBodySchema = z.object({
  id: z.string().uuid(),
});

export const categoryBodySchema = z.object({
  name: z.enum(Object.values(CategoryName)),
});

export const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  price: z.coerce.number(),
  stock: z.coerce.number(),
  author: z.string(),
  publisher: z.string(),
  categoryName: z.enum(Object.values(CategoryName)),
  image_url: z.string().nullable(),
});

export const deleteProductBodySchema = z.object({
  id: z.string().uuid(),
});

export const getProductBodySchema = z.object({
  id: z.string().uuid(),
});

export const updateProductBodySchemaParams = z.object({
  id: z.string().uuid(),
});

export const updateProductBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  stock: z.coerce.number().optional(),
  author: z.string().optional(),
  publisher: z.string().optional(),
  categoryName: z.enum(Object.values(CategoryName)).optional(),
  image_url: z.string().optional(),
});

export const productsAvailablesBodySchema = z.object({
  page: z.coerce.number(),
});

export const productsByCategoryBodySchema = z.object({
  query: z.enum(Object.values(CategoryName)),
  page: z.coerce.number(),
});

export const productsByNameBodySchema = z.object({
  query: z.string(),
  page: z.coerce.number(),
});

export const productsByPriceBodySchema = z.object({
  query: z.coerce.number(),
  page: z.coerce.number(),
});

export const createCartBodySchema = z.object({
  userId: z.string(),
});
