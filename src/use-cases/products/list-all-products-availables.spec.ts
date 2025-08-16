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
      name: "Unknown Biography Book",
      price: 400,
      stock: 10,
      description: "Livro desconhecido",
      image_url: "example.com",
      author: "John Doe",
      publisher: "Unknown",
      is_available: false,
    });

    const { products } = await sut.execute({
      page: 1,
    });

    expect(products).toHaveLength(1);
  });

  it("should be able to list products availables in page 2", async () => {
    const classicCategory = await productsRepository.createCategory("CLASSICS");

    for (let i = 1; i <= 22; i++) {
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
    }

    const { products } = await sut.execute({
      page: 2,
    });

    expect(products).toHaveLength(2);
  });
});
