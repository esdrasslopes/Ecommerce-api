import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createCartAndCartItem } from "@/utils/test-e2e/create-cart-and-cart-items";

describe("Get Details Of A Specific Cart Item controler (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get details of a specific cart item", async () => {
    const { token, cartItemId } = await createCartAndCartItem(app);

    const response = await request(app.server)
      .get(`/carts/cartItem/${cartItemId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
  });
});
