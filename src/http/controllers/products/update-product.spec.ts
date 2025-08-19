import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createCategoryAndProducts } from "@/utils/test-e2e/create-category-and-product";

describe("Update Product controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update product", async () => {
    const { productId, token } = await createCategoryAndProducts(app);

    const response = await request(app.server)
      .patch(`/products/${productId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        stock: 11,
      });

    expect(response.statusCode).toEqual(200);
  });
});
