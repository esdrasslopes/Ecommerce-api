import { FastifyInstance } from "fastify";

import request from "supertest";

import { createAndAuthenticateUser } from "./create-and-authenticate-user";

export const createCategoryAndProducts = async (app: FastifyInstance) => {
  const { token, userId } = await createAndAuthenticateUser(app, true);

  await request(app.server)
    .post("/products/create/category")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "FICTION",
    });

  const product = await request(app.server)
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
      image_url: "/public/2b8dc5bf-7934-42e7-be54-4e587e414446.jpeg",
    });

  return {
    productId: product.body.product.id,
    token,
    userId,
  };
};
