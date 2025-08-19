import { FastifyReply, FastifyRequest } from "fastify";

import { makeCreateCartUseCase } from "@/use-cases/factories/make-create-cart-use-case";

export const createCart = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const createCartUseCase = makeCreateCartUseCase();

  const { cart } = await createCartUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(201).send({
    message: "Cart successfully created",
    cart,
  });
};
