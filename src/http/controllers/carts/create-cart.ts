import { FastifyReply, FastifyRequest } from "fastify";

import { createCartBodySchema } from "@/types";

import { makeCreateCartUseCase } from "@/use-cases/factories/make-create-cart-use-case";

export const createCart = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = createCartBodySchema.parse(request.params);

  const createCartUseCase = makeCreateCartUseCase();

  const { cart } = await createCartUseCase.execute({
    userId,
  });

  return reply.status(200).send({
    message: "Cart successfully created",
    cart,
  });
};
