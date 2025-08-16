import { describe, expect, it, beforeAll, afterAll } from "vitest";

import { app } from "@/app";

import request from "supertest";

import { createAndAuthenticateUser } from "@/utils/test-e2e/create-and-authenticate-user";

describe("Profile controler (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to get user profile", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send({
        email: "johndoe@gmail.com",
        password: "123456",
      });

    expect(profileResponse.statusCode).toEqual(200);

    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "johndoe@gmail.com",
      })
    );
  });
});
