import { FastifyRequest, FastifyReply } from "fastify";

import { registerBodySchema } from "@/types";

import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      email,
      name,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      });
    }

    throw error;
  }

  return reply.status(201).send();
};
