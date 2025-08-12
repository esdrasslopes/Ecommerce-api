import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryCartsRepository } from "@/repositories/in-memory/in-memory-carts-repository";

import { CreateCartUseCase } from "./create-cart";

import { createUser } from "@/utils/test/create-user";

import { User } from "@prisma/client";

let cartsRepository: InMemoryCartsRepository;

let sut: CreateCartUseCase;

let createdUser: User;

describe("Create Product Use Case", () => {
  beforeEach(async () => {
    cartsRepository = new InMemoryCartsRepository();

    sut = new CreateCartUseCase(cartsRepository);

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to create a cart", async () => {
    const { cart } = await sut.execute({
      userId: createdUser.id,
    });

    expect(cart.id).toEqual(expect.any(String));
  });
});
