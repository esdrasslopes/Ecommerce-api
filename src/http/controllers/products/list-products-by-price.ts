import { FastifyReply, FastifyRequest } from "fastify";

import { productsByPriceQuerySchema } from "@/types";

import { makeListProductsByPriceUseCase } from "@/use-cases/factories/make-list-products-by-price";

export const listProductsByPrice = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { query, page } = productsByPriceQuerySchema.parse(request.query);

  const listProductsByCategoryUseCase = makeListProductsByPriceUseCase();

  const { productsByPrice } = await listProductsByCategoryUseCase.execute({
    price: query,
    page,
  });

  return reply.status(200).send({
    message: "Products found successfully",
    productsByPrice,
  });
};
