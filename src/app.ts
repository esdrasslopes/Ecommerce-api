import fastify from "fastify";

import fastifyJwt from "@fastify/jwt";

import cookies from "@fastify/cookie";

import multipart from "@fastify/multipart";

import fastifyStatic from "@fastify/static";

import path from "path";

import { ZodError } from "zod";

import { env } from "./env";

import { usersRoutes } from "./http/controllers/users/routes";

import { productsRoutes } from "./http/controllers/products/routes";
import { cartsRoutes } from "./http/controllers/carts/routes";

export const app = fastify();

app.register(fastifyStatic, {
  root: path.resolve(process.cwd(), "public"),
  prefix: "/public/",
});

app.register(multipart, {
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

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

app.register(productsRoutes, {
  prefix: "/products",
});

app.register(cartsRoutes, {
  prefix: "/carts",
});

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
