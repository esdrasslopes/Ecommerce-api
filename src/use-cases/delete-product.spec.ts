import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { DeleteProductUseCase } from "./delete-product";

import { ProductDoesNotExistError } from "./errors/product-does-not-exist-error";

let productsRepository: InMemoryProductsRepository;

let sut: DeleteProductUseCase;

describe("Update Product Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new DeleteProductUseCase(productsRepository);
  });

  it("should be able to update product", async () => {
    const casualCategory = await productsRepository.createCategory("CASUAL");

    const product = await productsRepository.createProduct({
      name: "Air force",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: casualCategory.id,
    });

    const { deletedProduct } = await sut.execute({ productId: product.id });

    expect(deletedProduct.id).toEqual(product.id);
  });

  it("should not be able to deleted non-existent product", async () => {
    await expect(async () => {
      await sut.execute({ productId: "" });
    }).rejects.toBeInstanceOf(ProductDoesNotExistError);
  });
});
