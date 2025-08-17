import { FastifyReply, FastifyRequest } from "fastify";

import { deleteOrGetOrUpdateProductBodySchema } from "@/types";

import { makeDeleteProductUseCase } from "@/use-cases/factories/make-delete-product.-use-case";

import { ProductDoesNotExistError } from "@/use-cases/errors/product-does-not-exist-error";
import { deleteImage } from "@/utils/files/delete-image";

export const deleteProduct = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { id } = deleteOrGetOrUpdateProductBodySchema.parse(request.params);

    const deleteProductUseCase = makeDeleteProductUseCase();

    const { deletedProduct } = await deleteProductUseCase.execute({
      productId: id,
    });

    if (deletedProduct.image_url) {
      await deleteImage(deletedProduct.image_url);
    }

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
