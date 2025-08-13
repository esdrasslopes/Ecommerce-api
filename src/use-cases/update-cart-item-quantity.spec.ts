import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryCartsRepository } from "@/repositories/in-memory/in-memory-carts-repository";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { UpdateCartItemQuantityUseCase } from "./update-cart-item-quantity";

import { createUser } from "@/utils/test/create-user";

import { User } from "@prisma/client";

let updateCartItemRepository: InMemoryCartsRepository;

let productsRepository: InMemoryProductsRepository;

let sut: UpdateCartItemQuantityUseCase;

let createdUser: User;

describe("Add Item to Cart Use Case", () => {
  beforeEach(async () => {
    updateCartItemRepository = new InMemoryCartsRepository();

    productsRepository = new InMemoryProductsRepository();

    sut = new UpdateCartItemQuantityUseCase(updateCartItemRepository);

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to add item to cart", async () => {
    const cart = await updateCartItemRepository.createCart(createdUser.id);

    const category = await productsRepository.createCategory("CASUAL");

    const product = await productsRepository.createProduct({
      name: "Air force",
      price: 500,
      stock: 10,
      description: "",
      image_url: "example",
      category_id: category.id,
    });

    const createdCartItem = await updateCartItemRepository.addItemtoCart(
      cart.id,
      product.id,
      9
    );

    const { cartItem } = await sut.execute({
      cartItemId: createdCartItem.id,
      quantity: 2,
    });

    expect(cartItem.quantity).toEqual(2);
  });
});
