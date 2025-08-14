import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryOrdersRepository } from "@/repositories/in-memory/in-memory-orders-repository";

import { CreateOrderUseCase } from "./create-order";

import { createUser } from "@/utils/test/create-user";

import { User } from "@prisma/client";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { createCartAndCartItems } from "@/utils/test/create-cart-and-cart-items";

let ordersRepository: InMemoryOrdersRepository;

let productsRepository: InMemoryProductsRepository;

let sut: CreateOrderUseCase;

let createdUser: User;

describe("Create Order Use Case", () => {
  beforeEach(async () => {
    ordersRepository = new InMemoryOrdersRepository();

    productsRepository = new InMemoryProductsRepository();

    sut = new CreateOrderUseCase(ordersRepository, productsRepository);

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to create an order", async () => {
    const category = await productsRepository.createCategory("CASUAL");

    const firstProduct = await productsRepository.createProduct({
      name: "Air force",
      price: 500,
      stock: 10,
      description: "",
      image_url: "example",
      category_id: category.id,
    });

    const secondProduct = await productsRepository.createProduct({
      name: "Air force",
      price: 500,
      stock: 10,
      description: "",
      image_url: "example",
      category_id: category.id,
    });

    const cartItems = await createCartAndCartItems(
      [firstProduct, secondProduct],
      createdUser.id
    );

    const { order } = await sut.execute({ cartItems, userId: createdUser.id });

    expect(order.items).toHaveLength(2);
  });
});
