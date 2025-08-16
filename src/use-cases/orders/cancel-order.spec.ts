import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";

import { CancelOrderUseCase } from "./cancel-order";

import { createUser } from "@/utils/test-in-memory/create-user";

import { User } from "@prisma/client";

import { CancelOrderError } from "../errors/cancel-order-error";

let ordersRepository: InMemoryOrdersRepository;

let sut: CancelOrderUseCase;

let createdUser: User;

describe("Cancel Order Use Case", () => {
  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository();

    sut = new CancelOrderUseCase(ordersRepository);

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to cancel an order", async () => {
    const createdOrder = await ordersRepository.createOrder({
      user_id: createdUser.id,
      total_price: 1000,
      status: "PENDING",
    });

    const { canceledOrder } = await sut.execute({
      orderId: createdOrder.id,
    });

    expect(canceledOrder.status).toEqual("CANCELED");
  });

  it("should not be able to cancel a non-exist order", async () => {
    await expect(async () => {
      await sut.execute({ orderId: "" });
    }).rejects.toBeInstanceOf(CancelOrderError);
  });

  it("should not be able to cancel a completed order", async () => {
    const createdOrder = await ordersRepository.createOrder({
      user_id: createdUser.id,
      total_price: 1000,
      status: "COMPLETED",
    });

    await expect(async () => {
      await sut.execute({ orderId: createdOrder.id });
    }).rejects.toBeInstanceOf(CancelOrderError);
  });

  it("should not be able to cancel a canceled order", async () => {
    const createdOrder = await ordersRepository.createOrder({
      user_id: createdUser.id,
      total_price: 1000,
      status: "CANCELED",
    });

    await expect(async () => {
      await sut.execute({ orderId: createdOrder.id });
    }).rejects.toBeInstanceOf(CancelOrderError);
  });
});
