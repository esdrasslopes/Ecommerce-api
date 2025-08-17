import { FastifyReply, FastifyRequest } from "fastify";

import { productsByCategoryBodySchema } from "@/types";

import { makeListProductsByCategoryUseCase } from "@/use-cases/factories/make-list-products-by-category-name";

export const listProductsByCategory = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { query, page } = productsByCategoryBodySchema.parse(request.query);

  const listProductsByCategoryUseCase = makeListProductsByCategoryUseCase();

  const { productsByCategory } = await listProductsByCategoryUseCase.execute({
    categoryName: query,
    page,
  });

  return reply.status(200).send({
    message: "Products found successfully",
    productsByCategory,
  });
};
