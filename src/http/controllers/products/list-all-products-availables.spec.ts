import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createCategoryAndProducts } from "@/utils/test-e2e/create-category-and-product";

describe("List All Products Availables controler (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list all products availables", async () => {
    const { token } = await createCategoryAndProducts(app);

    const response = await request(app.server)
      .get(`/products`)
      .query({
        page: "1",
      })
      .set("Authorization", `Bearer ${token}`);

    console.log(response.body);

    expect(response.statusCode).toEqual(200);
  });
});
