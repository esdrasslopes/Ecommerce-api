import { FastifyReply, FastifyRequest } from "fastify";

import { getDetailsOfASpecificOrderParamsSchema } from "@/types";

import { makeGetDetailsOfASpecificOrderUseCase } from "@/use-cases/factories/make-get-details-of-a-specific-order-use-case";

import { OrderDoesNotExistError } from "@/use-cases/errors/order-does-not-exist-error";

export const getDetailsOfASpecificOrder = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { orderId } = getDetailsOfASpecificOrderParamsSchema.parse(
    request.params
  );

  try {
    const getDetailsOfASpecificOrderUseCase =
      makeGetDetailsOfASpecificOrderUseCase();

    const { order } = await getDetailsOfASpecificOrderUseCase.execute({
      orderId,
    });

    return reply.status(200).send({
      message: "Order Item successfully picked up",
      order,
    });
  } catch (error) {
    if (error instanceof OrderDoesNotExistError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }
};
