import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createCategoryAndProducts } from "@/utils/test-e2e/create-category-and-product";

describe("List Products By Category controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list products by category", async () => {
    const { token } = await createCategoryAndProducts(app);

    const response = await request(app.server)
      .get(`/products/category`)
      .query({
        page: "1",
        query: "FICTION",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);

    expect(response.body.productsByCategory).toHaveLength(1);
  });
});
