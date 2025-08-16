import request from "supertest";

import { FastifyInstance } from "fastify";

import { prisma } from "@/lib/prisma";

import { hash } from "bcrypt";

export const createAndAuthenticateUser = async (
  app: FastifyInstance,
  isAdmin: boolean = false
) => {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password_hash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authResponse = await request(app.server).post("/session").send({
    email: "johndoe@gmail.com",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
};
