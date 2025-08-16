import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryCartsRepository } from "@/repositories/in-memory/in-memory-carts-repository";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { UpdateCartItemQuantityUseCase } from "./update-cart-item-quantity";

import { createUser } from "@/utils/test-in-memory/create-user";

import { User } from "@prisma/client";

let updateCartItemRepository: InMemoryCartsRepository;

let productsRepository: InMemoryProductsRepository;

let sut: UpdateCartItemQuantityUseCase;

let createdUser: User;

describe("Add Item to Cart Use Case", () => {
  beforeEach(async () => {
    updateCartItemRepository = new InMemoryCartsRepository();

    productsRepository = new InMemoryProductsRepository();

    sut = new UpdateCartItemQuantityUseCase(
      updateCartItemRepository,
      productsRepository
    );

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to add item to cart", async () => {
    const cart = await updateCartItemRepository.createCart(createdUser.id);

    const category = await productsRepository.createCategory("CLASSICS");

    const product = await productsRepository.createProduct({
      category_id: category.id,
      name: "Unknown",
      price: 400,
      stock: 10,
      description: "Livro desconhecido",
      image_url: "example.com",
      author: "John Doe",
      publisher: "Unknown",
    });

    const createdCartItem = await updateCartItemRepository.addItemtoCart(
      cart.id,
      product.id,
      9
    );

    const { cartItem } = await sut.execute({
      cartItemId: createdCartItem.id,
      newQuantity: 2,
    });

    expect(cartItem.quantity).toEqual(2);
  });
});
