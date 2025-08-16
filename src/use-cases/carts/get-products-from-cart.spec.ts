import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryCartsRepository } from "@/repositories/in-memory/in-memory-carts-repository";

import { GetItemsFromCartUseCase } from "./get-products-from-cart";

import { createUser } from "@/utils/test/create-user";

import { User } from "@prisma/client";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

let getItemsFromCartRepository: InMemoryCartsRepository;

let productsRepository: InMemoryProductsRepository;

let sut: GetItemsFromCartUseCase;

let createdUser: User;

describe("Get Products From Cart Use Case", () => {
  beforeEach(async () => {
    getItemsFromCartRepository = new InMemoryCartsRepository();

    productsRepository = new InMemoryProductsRepository();

    sut = new GetItemsFromCartUseCase(
      getItemsFromCartRepository,
      productsRepository
    );

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to get items from cart", async () => {
    const cart = await getItemsFromCartRepository.createCart(createdUser.id);

    const category = await productsRepository.createCategory("CASUAL");

    const product = await productsRepository.createProduct({
      name: "Air force",
      price: 500,
      stock: 10,
      description: "",
      image_url: "example",
      category_id: category.id,
    });

    await getItemsFromCartRepository.addItemtoCart(cart.id, product.id, 10);

    const { cartItems } = await sut.execute({
      cartId: cart.id,
      page: 1,
    });

    expect(cartItems).toHaveLength(1);
  });
});
