import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";

import { ListOrdersToValidateUseCase } from "./list-orders-to-validate";

import { createUser } from "@/utils/test-in-memory/create-user";

import { User } from "@prisma/client";

let ordersRepository: InMemoryOrdersRepository;

let sut: ListOrdersToValidateUseCase;

let createdUser: User;

describe("Orders To Validate Order Use Case", () => {
  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository();

    sut = new ListOrdersToValidateUseCase(ordersRepository);

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to list orders to validate ", async () => {
    await ordersRepository.createOrder({
      user_id: createdUser.id,
      total_price: 1000,
      status: "PENDING",
    });

    const { toValidateOrders } = await sut.execute();

    expect(toValidateOrders).toHaveLength(1);
  });
});
