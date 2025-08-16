import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { ListAllProductsAvailablesUseCase } from "./list-all-products-availables";

let productsRepository: InMemoryProductsRepository;

let sut: ListAllProductsAvailablesUseCase;

describe("List Products Availables Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new ListAllProductsAvailablesUseCase(productsRepository);
  });

  it("should be able to list products availables", async () => {
    const casualCategory = await productsRepository.createCategory("CASUAL");

    const sportCategory = await productsRepository.createCategory("SPORT");

    await productsRepository.createProduct({
      name: "Air force Branco",
      price: 400,
      stock: 0,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: casualCategory.id,
      is_available: false,
    });

    await productsRepository.createProduct({
      name: "Air force Preto",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: sportCategory.id,
    });

    const { products } = await sut.execute({
      page: 1,
    });

    expect(products).toHaveLength(1);
  });

  it("should be able to list products availables in page 2", async () => {
    const casualCategory = await productsRepository.createCategory("CASUAL");

    for (let i = 1; i <= 22; i++) {
      await productsRepository.createProduct({
        name: `Air Force ${i}`,
        price: 400,
        stock: i,
        description: "Tênis nike air force branco",
        image_url: "example.com",
        category_id: casualCategory.id,
        is_available: true,
      });
    }

    const { products } = await sut.execute({
      page: 2,
    });

    expect(products).toHaveLength(2);
  });
});
