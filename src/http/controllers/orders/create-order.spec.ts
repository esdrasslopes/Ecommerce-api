import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createCartAndCartItem } from "@/utils/test-e2e/create-cart-and-cart-items";

describe("Create Order controler (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create order", async () => {
    const { token, userId, cartItem } = await createCartAndCartItem(app);

    const response = await request(app.server)
      .post(`/orders/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        cartItems: [cartItem],
      });

    expect(response.statusCode).toEqual(201);
  });
});
