import { FastifyReply, FastifyRequest } from "fastify";

import { getDetailsOfASpecificCartItemParamsSchema } from "@/types";

import { makeGetDetailsOfASpecifCartItemUseCase } from "@/use-cases/factories/make-get-details-of-a-specific-cart-item-use-case";

import { CartItemDoesNotExistError } from "@/use-cases/errors/cart-item-does-not-exist-error";

export const getDetailsOfASpecificCartItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { cartItemId } = getDetailsOfASpecificCartItemParamsSchema.parse(
    request.params
  );

  try {
    const addItemToCartUseCase = makeGetDetailsOfASpecifCartItemUseCase();

    const { cartItem } = await addItemToCartUseCase.execute({
      id: cartItemId,
    });

    return reply.status(200).send({
      message: "Cart Item successfully picked up",
      cartItem,
    });
  } catch (error) {
    if (error instanceof CartItemDoesNotExistError) {
      return reply.status(201).send({
        message: error.message,
      });
    }

    throw error;
  }
};
