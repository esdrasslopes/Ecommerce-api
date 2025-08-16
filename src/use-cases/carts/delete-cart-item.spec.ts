import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryCartsRepository } from "@/repositories/in-memory/in-memory-carts-repository";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { DeleteCartItemUseCase } from "./delete-cart-item";

import { createUser } from "@/utils/test/create-user";

import { User } from "@prisma/client";

import { CartItemDoesNotExistError } from "../errors/cart-item-does-not-exist-error";

let deleteCartItemRepository: InMemoryCartsRepository;

let productsRepository: InMemoryProductsRepository;

let sut: DeleteCartItemUseCase;

let createdUser: User;

describe("Delete CartItem Use Case", () => {
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

  it("should be able to delete item from cart", async () => {
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
      0
    );

    const { deletedCartItem } = await sut.execute({
      cartId: cart.id,
      cartItemId: cartItem.id,
    });

    expect(deletedCartItem.id).toEqual(cartItem.id);

    expect(product.stock).toEqual(10);
  });

  it("should not be able to delete item from cart", async () => {
    await expect(async () => {
      await sut.execute({
        cartId: "",
        cartItemId: "",
      });
    }).rejects.toBeInstanceOf(CartItemDoesNotExistError);
  });
});
