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
    const casualCategory = await productsRepository.createCategory("CASUAL");

    const createdProduct = await productsRepository.createProduct({
      name: "Air force",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: casualCategory.id,
    });

    const { product } = await sut.execute({
      productId: createdProduct.id,
    });

    expect(product.id).toEqual(createdProduct.id);
  });
});
