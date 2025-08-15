import fastify from "fastify";

import fastifyJwt from "@fastify/jwt";

import cookies from "@fastify/cookie";

import { ZodError } from "zod";

import { env } from "./env";

import { usersRoutes } from "./http/controllers/users/routes";

export const app = fastify();

app.register(cookies);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(usersRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation Error",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV === "production") {
    console.error(error);
  }

  return reply.status(500).send({
    message: "Internal Server Error",
  });
});
