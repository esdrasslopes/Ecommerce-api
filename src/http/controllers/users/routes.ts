import { FastifyInstance } from "fastify";

import { register } from "./register";

import { authenticate } from "./authenticate";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { profile } from "./profile";

import { refresh } from "./refresh";

export const usersRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);

  app.post("/session", authenticate);

  app.get("/me", { onRequest: [verifyJwt] }, profile);

  app.patch("/token/refresh", refresh);
};
