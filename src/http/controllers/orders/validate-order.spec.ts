import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createOrderAndOrderItems } from "@/utils/test-e2e/create-order-and-order-items";

describe("Validate Order controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to validate order ", async () => {
    const { token, orderId } = await createOrderAndOrderItems(app);

    const response = await request(app.server)
      .patch(`/orders/validate/${orderId}`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        page: 1,
      });

    expect(response.statusCode).toEqual(200);
  });
});
