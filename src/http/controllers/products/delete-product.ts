import { FastifyReply, FastifyRequest } from "fastify";

import { deleteProductBodySchema } from "@/types";

import { makeDeleteProductUseCase } from "@/use-cases/factories/make-delete-product.-use-case";

import { ProductDoesNotExistError } from "@/use-cases/errors/product-does-not-exist-error";

export const deleteProduct = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = deleteProductBodySchema.parse(request.params);

    const deleteProductUseCase = makeDeleteProductUseCase();

    const { deletedProduct } = await deleteProductUseCase.execute({
      productId: id,
    });

    return reply.status(200).send({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    if (error instanceof ProductDoesNotExistError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
};
