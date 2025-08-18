import {
  updateProductBodySchemaParams,
  updateProductBodySchema,
} from "@/types";

import { FastifyReply, FastifyRequest } from "fastify";

import { makeUpdateProductUseCaseUseCase } from "@/use-cases/factories/make-update-product-use-case";

export const updateProduct = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = updateProductBodySchemaParams.parse(request.params);

  try {
    const data = updateProductBodySchema.parse(request.body);

    const updateProductUseCase = makeUpdateProductUseCaseUseCase();

    let productToUpdateData: any = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        productToUpdateData[key] = value;
      }
    });

    const { updatedProduct } = await updateProductUseCase.execute(
      { ...productToUpdateData },
      id
    );

    return reply.status(200).send({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {}
};
