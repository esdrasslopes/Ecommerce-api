import { FastifyReply, FastifyRequest } from "fastify";

import { createProductBodySchema } from "@/types";

import { ProductAlreadyExistError } from "@/use-cases/errors/product-already-exist.error";

import { makeCreateProductUseCase } from "@/use-cases/factories/make-create-product-use-case";

export const createProduct = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const {
    name,
    author,
    categoryName,
    description,
    price,
    publisher,
    stock,
    image_url,
  } = createProductBodySchema.parse(request.body);

  try {
    const createProductUseCase = makeCreateProductUseCase();

    const { product } = await createProductUseCase.execute({
      name,
      author,
      categoryName,
      description: description ?? "",
      price,
      publisher,
      stock,
      image_url: image_url ?? "",
    });

    return reply.status(201).send({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    if (error instanceof ProductAlreadyExistError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }
};
