import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createCartAndCartItem } from "@/utils/test-e2e/create-cart-and-cart-items";

describe("Delete Item From Cart controler (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete item from cart", async () => {
    const { token, cartId, cartItem } = await createCartAndCartItem(app);

    const response = await request(app.server)
      .delete(`/carts/${cartId}/${cartItem.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
  });
});
