import { FastifyReply, FastifyRequest } from "fastify";

import { createCartParamsSchema } from "@/types";

import { makeCreateCartUseCase } from "@/use-cases/factories/make-create-cart-use-case";

export const createCart = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = createCartParamsSchema.parse(request.params);

  const createCartUseCase = makeCreateCartUseCase();

  const { cart } = await createCartUseCase.execute({
    userId,
  });

  return reply.status(201).send({
    message: "Cart successfully created",
    cart,
  });
};
