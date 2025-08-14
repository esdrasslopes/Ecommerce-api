import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryCartsRepository } from "@/repositories/in-memory/in-memory-carts-repository";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { AddItemToCartUseCase } from "./add-item-to-cart";

import { createUser } from "@/utils/test/create-user";

import { User } from "@prisma/client";

import { ProductWithInsufficientStockError } from "../errors/product-with-insufficient-stock-error";

let addItemToCartRepository: InMemoryCartsRepository;

let productsRepository: InMemoryProductsRepository;

let sut: AddItemToCartUseCase;

let createdUser: User;

describe("Add Item to Cart Use Case", () => {
  beforeEach(async () => {
    addItemToCartRepository = new InMemoryCartsRepository();

    productsRepository = new InMemoryProductsRepository();

    sut = new AddItemToCartUseCase(addItemToCartRepository, productsRepository);

    const { user } = await createUser();

    createdUser = user;
  });

  it("should be able to add item to cart", async () => {
    const cart = await addItemToCartRepository.createCart(createdUser.id);

    const category = await productsRepository.createCategory("CASUAL");

    const product = await productsRepository.createProduct({
      name: "Air force",
      price: 500,
      stock: 10,
      description: "",
      image_url: "example",
      category_id: category.id,
    });

    const { cartItem } = await sut.execute({
      cartId: cart.id,
      productId: product.id,
      quantity: 9,
    });

    expect(cartItem.quantity).toEqual(9);

    expect(product.stock).toEqual(1);
  });

  it("should be able to add more quantity to cart item in cart", async () => {
    const cart = await addItemToCartRepository.createCart(createdUser.id);

    const category = await productsRepository.createCategory("CASUAL");

    const product = await productsRepository.createProduct({
      name: "Air force",
      price: 500,
      stock: 10,
      description: "",
      image_url: "example",
      category_id: category.id,
    });

    await sut.execute({
      cartId: cart.id,
      productId: product.id,
      quantity: 9,
    });

    const { cartItem } = await sut.execute({
      cartId: cart.id,
      productId: product.id,
      quantity: 1,
    });

    expect(cartItem.quantity).toEqual(10);

    expect(product.stock).toEqual(0);
  });

  it("should be not able to add item to cart with insufficient stock", async () => {
    const cart = await addItemToCartRepository.createCart(createdUser.id);

    const category = await productsRepository.createCategory("CASUAL");

    const product = await productsRepository.createProduct({
      name: "Air force",
      price: 500,
      stock: 0,
      description: "",
      image_url: "example",
      category_id: category.id,
    });

    await expect(async () => {
      await sut.execute({
        cartId: cart.id,
        productId: product.id,
        quantity: 10,
      });
    }).rejects.toBeInstanceOf(ProductWithInsufficientStockError);
  });
});
