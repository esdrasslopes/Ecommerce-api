import { Order, OrderItem } from "@prisma/client";

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

export const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  stock: z.coerce.number(),
  is_available: z.boolean(),
  category_id: z.string(),
});
