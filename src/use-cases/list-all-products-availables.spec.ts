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

    const { products } = await sut.execute();

    expect(products).toHaveLength(1);
  });
});
