import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { ListProductsByCategory } from "./list-products-by-category";

let productsRepository: InMemoryProductsRepository;

let sut: ListProductsByCategory;

describe("List Products By Category Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new ListProductsByCategory(productsRepository);
  });

  it("should be able to update product", async () => {
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

    const { productsByRepository } = await sut.execute({
      categoryName: "SPORT",
    });

    expect(productsByRepository).toHaveLength(2);
  });
});
