import { FastifyReply, FastifyRequest } from "fastify";

import { validateOrderParamsSchema } from "@/types";

import { makeValidateOrderUseCase } from "@/use-cases/factories/make-validate-order-use-case";

import { OrderDoesNotExistError } from "@/use-cases/errors/order-does-not-exist-error";

export const validateOrder = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { orderId } = validateOrderParamsSchema.parse(request.params);

  try {
    const validateOrderUseCase = makeValidateOrderUseCase();

    const { validatedOrder } = await validateOrderUseCase.execute({
      orderId,
    });

    return reply.status(200).send({
      message: "Orders successfully taken",
      validatedOrder,
    });
  } catch (error) {
    if (error instanceof OrderDoesNotExistError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
};
