import { FastifyReply, FastifyRequest } from "fastify";

import { createOrderBodySchema } from "@/types";

import { makeCreateOrderUseCase } from "@/use-cases/factories/make-create-order-use-case";

export const createOrder = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { cartItems } = createOrderBodySchema.parse(request.body);

  const createCartUseCase = makeCreateOrderUseCase();

  const { order } = await createCartUseCase.execute({
    cartItems,
    userId: request.user.sub,
  });

  return reply.status(201).send({
    message: "Order successfully created",
    order,
  });
};
