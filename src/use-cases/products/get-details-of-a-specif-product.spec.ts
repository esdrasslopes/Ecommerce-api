import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { GetDetailsOfASpecificProductsUseCase } from "./get-details-of-a-specif-product";

let productsRepository: InMemoryProductsRepository;

let sut: GetDetailsOfASpecificProductsUseCase;

describe("Get Details Of A Specif Product Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new GetDetailsOfASpecificProductsUseCase(productsRepository);
  });

  it("should be able to get details of a specif product", async () => {
    const classicCategory = await productsRepository.createCategory("CLASSICS");

    const createdProduct = await productsRepository.createProduct({
      category_id: classicCategory.id,
      name: "Unknown",
      price: 400,
      stock: 10,
      description: "Livro desconhecido",
      image_url: "example.com",
      author: "John Doe",
      publisher: "Unknown",
    });

    const { product } = await sut.execute({
      productId: createdProduct.id,
    });

    expect(product.id).toEqual(createdProduct.id);
  });
});
