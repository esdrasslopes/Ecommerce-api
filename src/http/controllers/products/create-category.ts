import { FastifyReply, FastifyRequest } from "fastify";

import { categoryBodySchema } from "@/types";

import { ExistingCategoryError } from "@/use-cases/errors/existing-category-error";

import { makeCreateCategoryUseCase } from "@/use-cases/factories/make-create-category-use-case";

export const createCategory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name } = categoryBodySchema.parse(request.body);

  try {
    const createCategoryUseCase = makeCreateCategoryUseCase();

    const { category } = await createCategoryUseCase.execute({
      categoryName: name,
    });

    return reply.status(201).send({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    if (error instanceof ExistingCategoryError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }
};
