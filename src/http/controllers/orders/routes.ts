import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { createOrder } from "./create-order";

import { cancelOrder } from "./cancel-order";

export const ordersRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post("/:userId", createOrder);

  app.patch("/:orderId", cancelOrder);
};
