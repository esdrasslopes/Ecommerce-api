import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createOrderAndOrderItems } from "@/utils/test-e2e/create-order-and-order-items";

describe("Get Orders History controler (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get orders history ", async () => {
    const { token, userId } = await createOrderAndOrderItems(app);

    const response = await request(app.server)
      .get(`/orders/history/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        page: 1,
      });

    expect(response.statusCode).toEqual(200);
  });
});
