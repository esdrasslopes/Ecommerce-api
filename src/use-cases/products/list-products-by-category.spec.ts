import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { ListProductsByCategoryUseCase } from "./list-products-by-category";

import { CategoryDoesNotExistError } from "../errors/category-does-not-exist";

let productsRepository: InMemoryProductsRepository;

let sut: ListProductsByCategoryUseCase;

describe("List Products By Category Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new ListProductsByCategoryUseCase(productsRepository);
  });

  it("should be able to list products by a specific category", async () => {
    const classicCategory = await productsRepository.createCategory("CLASSICS");

    const biographyCategory = await productsRepository.createCategory(
      "BIOGRAPHY"
    );

    await productsRepository.createProduct({
      category_id: biographyCategory.id,
      name: "Unknown Biography Book",
      price: 400,
      stock: 10,
      description: "Livro desconhecido",
      image_url: "example.com",
      author: "John Doe",
      publisher: "Unknown",
    });

    await productsRepository.createProduct({
      category_id: classicCategory.id,
      name: "Unknown",
      price: 400,
      stock: 10,
      description: "Livro desconhecido",
      image_url: "example.com",
      author: "John Doe",
      publisher: "Unknown",
    });

    await productsRepository.createProduct({
      category_id: classicCategory.id,
      name: "Unknown",
      price: 400,
      stock: 10,
      description: "Livro desconhecido",
      image_url: "example.com",
      author: "John Doe",
      publisher: "Unknown",
    });

    const { productsByCategory } = await sut.execute({
      categoryName: "CLASSICS",
      page: 1,
    });

    expect(productsByCategory).toHaveLength(2);
  });

  it("should not be able to list products by a specific category", async () => {
    await productsRepository.createProduct({
      category_id: "",
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
        page: 1,
      });
    }).rejects.toBeInstanceOf(CategoryDoesNotExistError);
  });
});
