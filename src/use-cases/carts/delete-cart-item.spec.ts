import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryCartsRepository } from "@/repositories/in-memory/in-memory-carts-repository";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { DeleteCartItemUseCase } from "./delete-cart-item";

import { createUser } from "@/utils/test/create-user";

import { User } from "@prisma/client";

let deleteCartItemRepository: InMemoryCartsRepository;

let productsRepository: InMemoryProductsRepository;

let sut: DeleteCartItemUseCase;

let createdUser: User;

describe("Add Item to Cart Use Case", () => {
  beforeEach(async () => {
    deleteCartItemRepository = new InMemoryCartsRepository();

    productsRepository = new InMemoryProductsRepository();

    sut = new DeleteCartItemUseCase(
      deleteCartItemRepository,
      productsRepository
    );

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to add item to cart", async () => {
    const cart = await deleteCartItemRepository.createCart(createdUser.id);

    const category = await productsRepository.createCategory("CASUAL");

    const product = await productsRepository.createProduct({
      name: "Air force",
      price: 500,
      stock: 10,
      description: "",
      image_url: "example",
      category_id: category.id,
    });

    const cartItem = await deleteCartItemRepository.addItemtoCart(
      cart.id,
      product.id,
      8
    );

    await productsRepository.updateProductStock(
      product.id,
      cartItem.quantity,
      "decrement"
    );

    const { deletedCartItem } = await sut.execute({
      cartId: cart.id,
      cartItemId: cartItem.id,
    });

    expect(deletedCartItem.id).toEqual(cartItem.id);

    expect(product.stock).toEqual(10);
  });
});
