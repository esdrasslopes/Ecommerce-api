import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createAndAuthenticateUser } from "@/utils/test-e2e/create-and-authenticate-user";

describe("Create Product controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create product", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/products/create/category")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "FICTION",
      });

    const response = await request(app.server)
      .post("/products/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pride and Prejudice",
        description:
          "A classic novel exploring manners, upbringing, morality, and marriage in early 19th century England",
        price: 49.99,
        stock: 10,
        author: "Jane Austen",
        publisher: "T. Egerton, Whitehall",
        categoryName: "FICTION",
        image_url: "/public/c4ab1a6b-3f0e-4adf-a5ad-a91ed0a3c6fc.jpeg",
      });

    expect(response.body.product.name).toEqual("Pride and Prejudice");
  });
});
