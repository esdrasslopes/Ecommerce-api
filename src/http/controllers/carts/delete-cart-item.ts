import { FastifyReply, FastifyRequest } from "fastify";

import { deleteCartItemParamsSchema } from "@/types";

import { makeDeleteCartItemUseCase } from "@/use-cases/factories/make-delete-cart-item-use-case";

import { CartItemDoesNotExistError } from "@/use-cases/errors/cart-item-does-not-exist-error";

export const deleteCartItem = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { cartId, cartItemId } = deleteCartItemParamsSchema.parse(
    request.params
  );

  try {
    const deleteCartItemUseCase = makeDeleteCartItemUseCase();

    const { deletedCartItem } = await deleteCartItemUseCase.execute({
      cartId,
      cartItemId,
    });

    return reply.status(200).send({
      message: "Cart item successfully deleted",
      deletedCartItem,
    });
  } catch (error) {
    if (error instanceof CartItemDoesNotExistError) {
      return reply.status(201).send({
        message: error.message,
      });
    }
  }
};
