import { FastifyReply, FastifyRequest } from "fastify";

import { getOrderHistoryQuerySchema } from "@/types";

import { makeGetOrderHistoryUseCase } from "@/use-cases/factories/make-get-order-history-use-case";

export const getOrdersHistory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page } = getOrderHistoryQuerySchema.parse(request.query);

  const getOrdersHistoryUseCase = makeGetOrderHistoryUseCase();

  const { orders } = await getOrdersHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    message: "Orders successfully taken",
    orders,
  });
};
