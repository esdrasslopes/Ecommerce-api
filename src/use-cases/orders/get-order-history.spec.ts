import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";

import { GetOrderHistoryUseCase } from "./get-order-history";

import { createUser } from "@/utils/test-in-memory/create-user";

import { User } from "@prisma/client";

let ordersRepository: InMemoryOrdersRepository;

let sut: GetOrderHistoryUseCase;

let createdUser: User;

describe("Get Order History Use Case", () => {
  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository();

    sut = new GetOrderHistoryUseCase(ordersRepository);

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to get the order history", async () => {
    const order = await ordersRepository.createOrder({
      user_id: createdUser.id,
      total_price: 1000,
      status: "PENDING",
    });

    await ordersRepository.createOrder({
      user_id: createdUser.id,
      total_price: 100,
      status: "PENDING",
    });

    await ordersRepository.createOrder({
      user_id: createdUser.id,
      total_price: 100,
      status: "PENDING",
    });

    await ordersRepository.createOrderItems({
      order_id: order.id,
      price_at_purchase: 1000,
      product_id: "teste",
      quantity: 10,
    });

    const { orders } = await sut.execute({
      userId: createdUser.id,
      page: 1,
    });

    expect(orders).toHaveLength(3);
  });
});
