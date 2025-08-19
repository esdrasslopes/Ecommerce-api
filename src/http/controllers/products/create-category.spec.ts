import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test-e2e/create-and-authenticate-user";

describe("Create Category controller (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create category", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post("/products/create/category")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "BIOGRAPHY",
      });

    expect(response.body.category.name).toEqual("BIOGRAPHY");
  });
});
