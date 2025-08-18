import { FastifyReply, FastifyRequest } from "fastify";

import { addItemToCartParamsSchema, addItemToCartBodySchema } from "@/types";

import { makeAddItemToCartUseCase } from "@/use-cases/factories/make-add-item-to-cart-use-case";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

import { ProductWithInsufficientStockError } from "@/use-cases/errors/product-with-insufficient-stock-error";

export const addItemToCart = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { cartId } = addItemToCartParamsSchema.parse(request.params);

  const { productId, quantity } = addItemToCartBodySchema.parse(request.body);

  try {
    const addItemToCartUseCase = makeAddItemToCartUseCase();

    const { cartItem } = await addItemToCartUseCase.execute({
      cartId,
      productId,
      quantity,
    });

    return reply.status(201).send({
      message: "Cart Item created successfully",
      cartItem,
    });
  } catch (error) {
    if (
      error instanceof ResourceNotFoundError ||
      error instanceof ProductWithInsufficientStockError
    ) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }
};
