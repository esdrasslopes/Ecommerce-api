import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { ListProductsByNameUseCase } from "./list-products-by-name";

let productsRepository: InMemoryProductsRepository;

let sut: ListProductsByNameUseCase;

describe("List Products By Name Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new ListProductsByNameUseCase(productsRepository);
  });

  it("should be able to list products by name", async () => {
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

    const { productsByName } = await sut.execute({
      productName: "Biography",
      page: 1,
    });

    expect(productsByName).toHaveLength(2);
  });
});
