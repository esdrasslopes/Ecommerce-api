import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { ListProductsByNameUseCase } from "./list-products-by-name";

let productsRepository: InMemoryProductsRepository;

let sut: ListProductsByNameUseCase;

describe("List Products By Category Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new ListProductsByNameUseCase(productsRepository);
  });

  it("should be able to list products by name", async () => {
    const casualCategory = await productsRepository.createCategory("CASUAL");

    const sportCategory = await productsRepository.createCategory("SPORT");

    await productsRepository.createProduct({
      name: "Air force Branco",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: casualCategory.id,
    });

    await productsRepository.createProduct({
      name: "Air force Preto",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: sportCategory.id,
    });

    const { productsByName } = await sut.execute({
      productName: "Air force",
    });

    expect(productsByName).toHaveLength(2);
  });
});
