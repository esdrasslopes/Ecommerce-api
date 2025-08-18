import { FastifyReply, FastifyRequest } from "fastify";

import { createOrderParamsSchema, createOrderBodySchema } from "@/types";

import { makeCreateOrderUseCase } from "@/use-cases/factories/make-create-order-use-case";

export const createOrder = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { userId } = createOrderParamsSchema.parse(request.params);

  const { cartItems } = createOrderBodySchema.parse(request.body);

  const createCartUseCase = makeCreateOrderUseCase();

  const { order } = await createCartUseCase.execute({
    cartItems,
    userId,
  });

  return reply.status(201).send({
    message: "Order successfully created",
    order,
  });
};
