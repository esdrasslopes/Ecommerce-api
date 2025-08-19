import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createCartAndCartItem } from "@/utils/test-e2e/create-cart-and-cart-items";

describe("Update Cart Item Quantity controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update cart item quantity", async () => {
    const { token, cartItem } = await createCartAndCartItem(app);

    const response = await request(app.server)
      .patch(`/carts/${cartItem.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        newQuantity: 4,
      });

    expect(response.statusCode).toEqual(200);
  });
});
