import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { UpdateProductUseCase } from "./update-product";

import { ProductDoesNotExistError } from "../errors/product-does-not-exist-error";

let productsRepository: InMemoryProductsRepository;

let sut: UpdateProductUseCase;

describe("Update Product Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new UpdateProductUseCase(productsRepository);
  });

  it("should be able to update product", async () => {
    const classicCategory = await productsRepository.createCategory("CLASSICS");

    const biographyCategory = await productsRepository.createCategory(
      "BIOGRAPHY"
    );

    const product = await productsRepository.createProduct({
      category_id: classicCategory.id,
      name: "Unknown",
      price: 400,
      stock: 10,
      description: "Livro desconhecido",
      image_url: "example.com",
      author: "John Doe",
      publisher: "Unknown",
    });

    const { updatedProduct } = await sut.execute(
      {
        name: "Updated Book",
        price: 450,
        categoryName: "BIOGRAPHY",
      },
      product.id
    );

    expect(updatedProduct.price).toEqual(450);

    expect(updatedProduct.category_id).toEqual(biographyCategory.id);
  });

  it("should not be able to update product", async () => {
    await productsRepository.createCategory("CLASSICS");

    await expect(async () => {
      await sut.execute(
        {
          name: "Unknown",
          price: 450,
          categoryName: "CLASSICS",
        },
        ""
      );
    }).rejects.toBeInstanceOf(ProductDoesNotExistError);
  });
});
