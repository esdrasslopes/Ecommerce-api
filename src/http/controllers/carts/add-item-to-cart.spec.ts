import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createCategoryAndProducts } from "@/utils/test-e2e/create-category-and-product";

describe("Add Item To Cart  controler (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to add item to cart ", async () => {
    const { productId, token, userId } = await createCategoryAndProducts(app);

    const cart = await request(app.server)
      .post(`/carts/create/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    const cartId = cart.body.cart.id;

    const response = await request(app.server)
      .post(`/carts/create/cartItem/${cartId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId,
        quantity: 1,
      });

    expect(response.statusCode).toEqual(201);
  });
});
