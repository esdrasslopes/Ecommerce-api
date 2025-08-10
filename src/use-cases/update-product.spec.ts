import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { UpdateProductUseCase } from "./update-product";

let productsRepository: InMemoryProductsRepository;

let sut: UpdateProductUseCase;

describe("Update Product Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new UpdateProductUseCase(productsRepository);
  });

  it("should be able to update product", async () => {
    const category = await productsRepository.createCategory("CASUAL");

    const product = await productsRepository.createProduct({
      name: "Air force",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: category.id,
    });

    const { updatedProduct } = await sut.execute(
      {
        name: "Air",
        price: 450,
      },
      product.id
    );

    expect(updatedProduct.price).toEqual(450);
  });
});
