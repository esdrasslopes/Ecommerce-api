import { FastifyInstance } from "fastify";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { createCategory } from "./create-category";

import { verifyUserRole } from "@/http/middlewares/verify-user-role";

export const productsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.post(
    "/create/category",
    { onRequest: [verifyUserRole("ADMIN")] },
    createCategory
  );
};
