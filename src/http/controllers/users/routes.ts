import { FastifyInstance } from "fastify";

import { register } from "./register";

import { authenticate } from "./authenticate";

export const usersRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);

  app.post("/session", authenticate);
};
