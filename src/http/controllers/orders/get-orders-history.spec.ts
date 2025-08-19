import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createOrderAndOrderItems } from "@/utils/test-e2e/create-order-and-order-items";

describe("Get Orders History controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get orders history ", async () => {
    const { token } = await createOrderAndOrderItems(app);

    const response = await request(app.server)
      .get(`/orders/history`)
      .set("Authorization", `Bearer ${token}`)
      .query({
        page: 1,
      });

    console.log(response.body);

    expect(response.statusCode).toEqual(200);
  });
});
