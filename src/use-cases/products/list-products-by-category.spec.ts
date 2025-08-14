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
    const casualCategory = await productsRepository.createCategory("CASUAL");

    const sportCategory = await productsRepository.createCategory("SPORT");

    await productsRepository.createProduct({
      name: "Air force",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: casualCategory.id,
    });

    await productsRepository.createProduct({
      name: "Air force",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: sportCategory.id,
    });

    await productsRepository.createProduct({
      name: "Air force",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: sportCategory.id,
    });

    const { productsByCategory } = await sut.execute({
      categoryName: "SPORT",
    });

    expect(productsByCategory).toHaveLength(2);
  });

  it("should not be able to list products by a specific category", async () => {
    await productsRepository.createProduct({
      name: "Air force",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: "",
    });

    await expect(async () => {
      await sut.execute({
        categoryName: "SPORT",
      });
    }).rejects.toBeInstanceOf(CategoryDoesNotExistError);
  });
});
