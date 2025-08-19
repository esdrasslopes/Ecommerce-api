import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createCartAndCartItem } from "@/utils/test-e2e/create-cart-and-cart-items";

describe("Get Items From Cart controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get items from cart", async () => {
    const { token, cartId } = await createCartAndCartItem(app);

    const response = await request(app.server)
      .get(`/carts/${cartId}`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        page: 1,
      });

    expect(response.statusCode).toEqual(200);
  });
});
