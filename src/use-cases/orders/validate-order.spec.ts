import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";

import { ValidateOrderUseCase } from "./validate-order";

import { createUser } from "@/utils/test-in-memory/create-user";

import { User } from "@prisma/client";

import { OrderDoesNotExistError } from "../errors/order-does-not-exist-error";

let ordersRepository: InMemoryOrdersRepository;

let sut: ValidateOrderUseCase;

let createdUser: User;

describe("Validate Order Use Case", () => {
  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository();

    sut = new ValidateOrderUseCase(ordersRepository);

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to validate an order", async () => {
    const createdOrder = await ordersRepository.createOrder({
      user_id: createdUser.id,
      total_price: 1000,
      status: "PENDING",
    });

    const { validatedOrder } = await sut.execute({ orderId: createdOrder.id });

    expect(validatedOrder.status).toEqual("COMPLETED");
  });

  it("should not be able to validate a non-exist order", async () => {
    await expect(async () => {
      await sut.execute({ orderId: "" });
    }).rejects.toBeInstanceOf(OrderDoesNotExistError);
  });
});
