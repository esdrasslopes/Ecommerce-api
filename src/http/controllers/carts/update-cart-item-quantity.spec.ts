import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createCartAndCartItem } from "@/utils/test-e2e/create-cart-and-cart-items";

describe("Update Cart Item Quantity controler (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update cart item quantity", async () => {
    const { token, cartItemId } = await createCartAndCartItem(app);

    const response = await request(app.server)
      .patch(`/carts/${cartItemId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        newQuantity: 4,
      });

    expect(response.statusCode).toEqual(200);
  });
});
