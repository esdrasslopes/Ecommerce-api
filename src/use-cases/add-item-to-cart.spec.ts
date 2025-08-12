import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryCartsRepository } from "@/repositories/in-memory/in-memory-carts-repository";

import { AddItemToCartUseCase } from "./add-item-to-cart";

import { createUser } from "@/utils/test/create-user";

import { CreateProducts } from "@/utils/test/create-products";

import { Product, User } from "@prisma/client";

let addItemToCartRepository: InMemoryCartsRepository;

let sut: AddItemToCartUseCase;

let createdUser: User;

let product: Product;

describe("Add Item to Cart Use Case", () => {
  beforeEach(async () => {
    addItemToCartRepository = new InMemoryCartsRepository();

    sut = new AddItemToCartUseCase(addItemToCartRepository);

    const { user } = await createUser();

    createdUser = user;

    product = await CreateProducts();
  });

  it("should be able to add item to cart", async () => {
    const cart = await addItemToCartRepository.createCart(createdUser.id);

    const { cartItem } = await sut.execute({
      cartId: cart.id,
      productId: product.id,
      quantity: 10,
    });

    expect(cartItem.quantity).toEqual(10);
  });
});
