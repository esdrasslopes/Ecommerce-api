import { FastifyInstance } from "fastify";

import { create } from "./create";

export const productsRoutes = async (app: FastifyInstance) => {
  app.post("/create", create);
};
