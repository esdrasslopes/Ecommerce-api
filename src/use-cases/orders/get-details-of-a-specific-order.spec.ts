import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";

import { GetDetailsOfASpecificOrder } from "./get-details-of-a-specific-order";

import { createUser } from "@/utils/test-in-memory/create-user";

import { User } from "@prisma/client";

let ordersRepository: InMemoryOrdersRepository;

let sut: GetDetailsOfASpecificOrder;

let createdUser: User;

describe("Get Details Of A Specific Order Use Case", () => {
  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository();

    sut = new GetDetailsOfASpecificOrder(ordersRepository);

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to get details of a specific order", async () => {
    const createdOrder = await ordersRepository.createOrder({
      user_id: createdUser.id,
      total_price: 1000,
      status: "PENDING",
    });

    await ordersRepository.createOrderItems({
      order_id: createdOrder.id,
      price_at_purchase: 1000,
      product_id: "teste",
      quantity: 10,
    });

    const { order } = await sut.execute({
      orderId: createdOrder.id,
    });

    expect(order.status).toEqual("PENDING");

    expect(order.items).toHaveLength(1);
  });
});
