import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { ListProductsByPriceUseCase } from "./list-products-by-price";

let productsRepository: InMemoryProductsRepository;

let sut: ListProductsByPriceUseCase;

describe("List Products By Category Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new ListProductsByPriceUseCase(productsRepository);
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

    await productsRepository.createProduct({
      name: "Air force Marrom",
      price: 450,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: sportCategory.id,
    });

    const { productsByPrice } = await sut.execute({
      price: 400,
    });

    console.log(productsByPrice);

    expect(productsByPrice).toHaveLength(2);
  });
});
