import { FastifyReply, FastifyRequest } from "fastify";

import { makeGetDetailsOfASpecificProductsUseCase } from "@/use-cases/factories/make-get-details-a-specific-product-use-case";

import { getProductBodySchema } from "@/types";

import { ProductDoesNotExistError } from "@/use-cases/errors/product-does-not-exist-error";

export const getDetailsOfASpecificProduct = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = getProductBodySchema.parse(request.params);

    const getDetailsOfASpecificProduct =
      makeGetDetailsOfASpecificProductsUseCase();

    const { product } = await getDetailsOfASpecificProduct.execute({
      productId: id,
    });

    return reply.status(200).send({
      message: "Product found successfully",
      product,
    });
  } catch (error) {
    if (error instanceof ProductDoesNotExistError) {
      return reply.status(200).send({
        message: error.message,
      });
    }

    throw error;
  }
};
