import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { createCart } from "./create-cart";

import { addItemToCart } from "./add-item-to-cart";

export const cartsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post("/create/:userId", createCart);

  app.post("/create/cartItem/:cartId", addItemToCart);
};
