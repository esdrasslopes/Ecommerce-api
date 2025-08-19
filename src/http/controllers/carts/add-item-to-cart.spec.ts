import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createCartAndCartItem } from "@/utils/test-e2e/create-cart-and-cart-items";

describe("Add Item To Cart controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to add item to cart", async () => {
    const { productId, token, cartId } = await createCartAndCartItem(app);

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
