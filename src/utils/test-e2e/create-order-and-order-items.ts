import { FastifyInstance } from "fastify";

import { createCartAndCartItem } from "./create-cart-and-cart-items";

import request from "supertest";

export const createOrderAndOrderItems = async (app: FastifyInstance) => {
  const { token, userId, cartItem, cartId, productId } =
    await createCartAndCartItem(app);

  const response = await request(app.server)
    .post(`/orders`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      cartItems: [cartItem],
    });

  return {
    token,
    userId,
    cartItem,
    cartId,
    productId,
    orderId: response.body.order.id,
  };
};
