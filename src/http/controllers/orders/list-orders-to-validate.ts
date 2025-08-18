import { FastifyReply, FastifyRequest } from "fastify";

import { makeListOrdersToValidateUseCase } from "@/use-cases/factories/make-list-orders-to-validate-use-case";

export const ListOrdersToValidate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const ListOrdersToValidateUseCase = makeListOrdersToValidateUseCase();

  const { toValidateOrders } = await ListOrdersToValidateUseCase.execute();

  return reply.status(200).send({
    message: "Orders successfully taken",
    toValidateOrders,
  });
};
