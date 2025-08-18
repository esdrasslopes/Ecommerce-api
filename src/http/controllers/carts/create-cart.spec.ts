import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createAndAuthenticateUser } from "@/utils/test-e2e/create-and-authenticate-user";

describe("Create Cart controler (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create cart", async () => {
    const { userId, token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post(`/carts/create/${userId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
  });
});
