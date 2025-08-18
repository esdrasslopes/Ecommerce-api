import { CategoryName, Order, OrderItem, CartItem } from "@prisma/client";

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

export const updateProductParamsSchema = z.object({
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

export const productsByCategoryQuerySchema = z.object({
  query: z.enum(Object.values(CategoryName)),
  page: z.coerce.number(),
});

export const productsByNameQuerySchema = z.object({
  query: z.string(),
  page: z.coerce.number(),
});

export const productsByPriceQuerySchema = z.object({
  query: z.coerce.number(),
  page: z.coerce.number(),
});

export const createCartParamsSchema = z.object({
  userId: z.string(),
});

export const addItemToCartParamsSchema = z.object({
  cartId: z.string(),
});

export const addItemToCartBodySchema = z.object({
  productId: z.string(),
  quantity: z.coerce.number(),
});

export const deleteCartItemParamsSchema = z.object({
  cartId: z.string(),
  cartItemId: z.string(),
});

export const updateCartItemQuantityParamsSchema = z.object({
  cartItemId: z.string(),
});

export const updateCartItemQuantityBodySchema = z.object({
  newQuantity: z.coerce.number(),
});

export const getItemsFromCartQuerySchema = z.object({
  page: z.coerce.number(),
});

export const getItemsFromCartParamsSchema = z.object({
  cartId: z.string(),
});

export const getDetailsOfASpecificCartItemParamsSchema = z.object({
  cartItemId: z.string(),
});

export const createOrderParamsSchema = z.object({
  userId: z.string(),
});

const cartItemSchema = z.object({
  id: z.string(),
  cart_id: z.string(),
  product_id: z.string(),
  quantity: z.coerce.number(),
});

export const createOrderBodySchema = z.object({
  cartItems: z.array(cartItemSchema),
});

export const cancelOrderParamsSchema = z.object({
  orderId: z.string(),
});

export const getDetailsOfASpecificOrderParamsSchema = z.object({
  orderId: z.string(),
});

export const getOrderHistoryParamsSchema = z.object({
  userId: z.string(),
});

export const getOrderHistoryQuerySchema = z.object({
  page: z.coerce.number(),
});
