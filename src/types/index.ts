import { Order, OrderItem } from "@prisma/client";

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
}

export type OrderWithItems = Order & {
  items?: OrderItem[];
};

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
