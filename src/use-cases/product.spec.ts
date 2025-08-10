import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { CreateProductUseCase } from "./product";

import { ProductAlreadyExistError } from "./errors/product-already-exist.error";

let productsRepository: InMemoryProductsRepository;

let sut: CreateProductUseCase;

describe("Create Product Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new CreateProductUseCase(productsRepository);
  });

  it("should be able to create a new product", async () => {
    await productsRepository.createCategory("CASUAL");

    const { product } = await sut.execute({
      categoryName: "CASUAL",
      name: "Air force",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
    });

    expect(product).toEqual(
      expect.objectContaining({
        name: "Air force",
      })
    );
  });

  it("should not be able to create the same product twice", async () => {
    await productsRepository.createCategory("CASUAL");

    await sut.execute({
      categoryName: "CASUAL",
      name: "Air force",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
    });

    await expect(async () => {
      await sut.execute({
        categoryName: "CASUAL",
        name: "Air force",
        price: 400,
        stock: 10,
        description: "Tênis nike air force branco",
        image_url: "example.com",
      });
    }).rejects.toBeInstanceOf(ProductAlreadyExistError);
  });
});
