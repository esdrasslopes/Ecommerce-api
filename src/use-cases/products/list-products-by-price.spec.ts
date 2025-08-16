import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { ListProductsByPriceUseCase } from "./list-products-by-price";

let productsRepository: InMemoryProductsRepository;

let sut: ListProductsByPriceUseCase;

describe("List Products By Price Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new ListProductsByPriceUseCase(productsRepository);
  });

  it("should be able to list products by price", async () => {
    const classicCategory = await productsRepository.createCategory("CLASSICS");

    const biographyCategory = await productsRepository.createCategory(
      "BIOGRAPHY"
    );

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
      category_id: biographyCategory.id,
      name: "Biography Book",
      price: 400,
      stock: 10,
      description: "Livro desconhecido",
      image_url: "example.com",
      author: "John Doe",
      publisher: "Unknown",
    });

    const { productsByPrice } = await sut.execute({
      price: 400,
      page: 1,
    });

    expect(productsByPrice).toHaveLength(2);
  });
});
