import { FastifyReply, FastifyRequest } from "fastify";

import {
  updateCartItemQuantityParamsSchema,
  updateCartItemQuantityBodySchema,
} from "@/types";

import { CartItemDoesNotExistError } from "@/use-cases/errors/cart-item-does-not-exist-error";

import { makeUpdateCartItemQuantityUseCase } from "@/use-cases/factories/make-update-cart-item-quantity-use-case";

export const updateCartItemQuantity = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { cartItemId } = updateCartItemQuantityParamsSchema.parse(
    request.params
  );

  const { newQuantity } = updateCartItemQuantityBodySchema.parse(request.body);

  try {
    const updateCartItemQuantityUseCase = makeUpdateCartItemQuantityUseCase();

    const { cartItem } = await updateCartItemQuantityUseCase.execute({
      cartItemId,
      newQuantity,
    });

    return reply.status(200).send({
      message: "Cart item quantity successfully updated",
      cartItem,
    });
  } catch (error) {
    if (error instanceof CartItemDoesNotExistError) {
      return reply.status(201).send({
        message: error.message,
      });
    }
  }
};
