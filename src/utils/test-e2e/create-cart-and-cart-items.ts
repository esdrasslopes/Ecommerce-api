import { FastifyInstance } from "fastify";

import request from "supertest";

import { createCategoryAndProducts } from "./create-category-and-product";

export const createCartAndCartItem = async (app: FastifyInstance) => {
  const { token, userId, productId } = await createCategoryAndProducts(app);

  const cart = await request(app.server)
    .post(`/carts/create`)
    .set("Authorization", `Bearer ${token}`);

  const cartId = cart.body.cart.id;

  const response = await request(app.server)
    .post(`/carts/create/cartItem/${cartId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      productId,
      quantity: 1,
    });

  const cartItem = response.body.cartItem;

  return {
    productId,
    token,
    userId,
    cartId,
    cartItem,
  };
};
