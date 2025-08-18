import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { createOrder } from "./create-order";

import { cancelOrder } from "./cancel-order";

import { getDetailsOfASpecificOrder } from "./get-details-of-a-specific-order";

import { getOrdersHistory } from "./get-orders-history";

import { verifyUserRole } from "@/http/middlewares/verify-user-role";

import { validateOrder } from "./validate-order";

export const ordersRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post("/:userId", createOrder);

  app.patch("/:orderId", cancelOrder);

  app.get("/:orderId", getDetailsOfASpecificOrder);

  app.get("/history/:userId", getOrdersHistory);

  app.patch(
    "/validate/:orderId",
    { onRequest: [verifyUserRole("ADMIN")] },
    validateOrder
  );
};
