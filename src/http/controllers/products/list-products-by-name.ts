import { FastifyReply, FastifyRequest } from "fastify";

import { productsByNameBodySchema } from "@/types";

import { makeListProductsByNameUseCase } from "@/use-cases/factories/make-list-products-by-name";

export const listProductsByName = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { query, page } = productsByNameBodySchema.parse(request.query);

  const listProductsByCategoryUseCase = makeListProductsByNameUseCase();

  const { productsByName } = await listProductsByCategoryUseCase.execute({
    productName: query,
    page,
  });

  return reply.status(200).send({
    message: "Products found successfully",
    productsByName,
  });
};
