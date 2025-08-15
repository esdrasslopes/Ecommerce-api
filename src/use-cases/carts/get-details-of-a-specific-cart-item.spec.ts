import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryCartsRepository } from "@/repositories/in-memory/in-memory-carts-repository";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { GetDetailsOfASpecifCartItemUseCase } from "./get-details-of-a-specific-cart-item";

import { createUser } from "@/utils/test/create-user";

import { User } from "@prisma/client";

import { CartItemDoesNotExistError } from "../errors/cart-item-does-not-exist-error";

let getDetailsOfASpecifCartItemRepository: InMemoryCartsRepository;

let productsRepository: InMemoryProductsRepository;

let sut: GetDetailsOfASpecifCartItemUseCase;

let createdUser: User;

describe("Get Details Of A Specific Cart Item Use Case", () => {
  beforeEach(async () => {
    getDetailsOfASpecifCartItemRepository = new InMemoryCartsRepository();

    productsRepository = new InMemoryProductsRepository();

    sut = new GetDetailsOfASpecifCartItemUseCase(
      getDetailsOfASpecifCartItemRepository
    );

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to get details of a specific cart items", async () => {
    const cart = await getDetailsOfASpecifCartItemRepository.createCart(
      createdUser.id
    );

    const category = await productsRepository.createCategory("CASUAL");

    const product = await productsRepository.createProduct({
      name: "Air force",
      price: 500,
      stock: 10,
      description: "",
      image_url: "example",
      category_id: category.id,
    });

    const createdcCartItem =
      await getDetailsOfASpecifCartItemRepository.addItemtoCart(
        cart.id,
        product.id,
        9
      );

    const { cartItem } = await sut.execute({
      id: createdcCartItem.id,
    });

    expect(cartItem.quantity).toEqual(9);
  });

  it("should not be able to get details of a specific cart items", async () => {
    await expect(async () => {
      const { cartItem } = await sut.execute({
        id: "",
      });
    }).rejects.toBeInstanceOf(CartItemDoesNotExistError);
  });
});
