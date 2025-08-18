import { FastifyReply, FastifyRequest } from "fastify";

import { cancelOrderParamsSchema } from "@/types";

import { makeCancelOrderUseCase } from "@/use-cases/factories/make-cancel-order-use-case";

import { CancelOrderError } from "@/use-cases/errors/cancel-order-error";

export const cancelOrder = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { orderId } = cancelOrderParamsSchema.parse(request.params);

  try {
    const createCartUseCase = makeCancelOrderUseCase();

    const { canceledOrder } = await createCartUseCase.execute({
      orderId,
    });

    return reply.status(200).send({
      message: "Order successfully canceled",
      canceledOrder,
    });
  } catch (error) {
    if (error instanceof CancelOrderError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }
};
