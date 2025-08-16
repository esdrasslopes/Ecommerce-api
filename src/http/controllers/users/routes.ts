import { FastifyInstance } from "fastify";

import { register } from "./register";

import { authenticate } from "./authenticate";

import { verifyJwt } from "@/http/middlewares/verify-jwt";

import { profile } from "./profile";

export const usersRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);

  app.post("/session", authenticate);

  app.get("/me", { onRequest: [verifyJwt] }, profile);
};
