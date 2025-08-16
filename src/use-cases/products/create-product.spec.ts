import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { CreateProductUseCase } from "./create-product";

import { ProductAlreadyExistError } from "../errors/product-already-exist.error";

let productsRepository: InMemoryProductsRepository;

let sut: CreateProductUseCase;

describe("Create Product Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new CreateProductUseCase(productsRepository);
  });

  it("should be able to create a new product", async () => {
    await productsRepository.createCategory("CLASSICS");

    const { product } = await sut.execute({
      categoryName: "CLASSICS",
      name: "Unknown",
      price: 400,
      stock: 10,
      description: "Livro desconhecido",
      image_url: "example.com",
      author: "John Doe",
      publisher: "Unknown",
    });

    expect(product).toEqual(
      expect.objectContaining({
        name: "Unknown",
      })
    );
  });

  it("should not be able to create the same product twice", async () => {
    await productsRepository.createCategory("CLASSICS");

    await sut.execute({
      categoryName: "CLASSICS",
      name: "Unknown",
      price: 400,
      stock: 10,
      description: "Livro desconhecido",
      image_url: "example.com",
      author: "John Doe",
      publisher: "Unknown",
    });

    await expect(async () => {
      await sut.execute({
        categoryName: "CLASSICS",
        name: "Unknown",
        price: 400,
        stock: 10,
        description: "Livro desconhecido",
        image_url: "example.com",
        author: "John Doe",
        publisher: "Unknown",
      });
    }).rejects.toBeInstanceOf(ProductAlreadyExistError);
  });
});
