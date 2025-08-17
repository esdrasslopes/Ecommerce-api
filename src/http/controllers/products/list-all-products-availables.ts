import { FastifyReply, FastifyRequest } from "fastify";

import { productsAvailablesBodySchema } from "@/types";

import { makeListAllProductsAvailablesUseCase } from "@/use-cases/factories/make-list-all-products-availables-use-case";

export const listAllProductsAvailables = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page } = productsAvailablesBodySchema.parse(request.query);

  const listAllProductsAvailablesUseCase =
    makeListAllProductsAvailablesUseCase();

  const { products } = await listAllProductsAvailablesUseCase.execute({
    page,
  });

  return reply.status(200).send({
    message: "Products found successfully",
    products,
  });
};
