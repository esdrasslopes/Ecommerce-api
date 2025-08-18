import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createOrderAndOrderItems } from "@/utils/test-e2e/create-order-and-order-items";

describe("Get Details Of A Specific Order controler (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get details of a specific order", async () => {
    const { token, orderId } = await createOrderAndOrderItems(app);

    const response = await request(app.server)
      .get(`/orders/${orderId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
  });
});
