import { FastifyReply, FastifyRequest } from "fastify";

import {
  getItemsFromCartParamsSchema,
  getItemsFromCartQuerySchema,
} from "@/types";

import { makeGetItemsFromCartUseCase } from "@/use-cases/factories/make-get-products-from-cart-use-case";

export const getItemsFromCart = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { cartId } = getItemsFromCartParamsSchema.parse(request.params);

  const { page } = getItemsFromCartQuerySchema.parse(request.query);

  const getItemsFromCartUseCase = makeGetItemsFromCartUseCase();

  const { cartItems } = await getItemsFromCartUseCase.execute({
    cartId,
    page,
  });

  return reply.status(200).send({
    message: "Cart Items successfully picked up",
    cartItems,
  });
};
