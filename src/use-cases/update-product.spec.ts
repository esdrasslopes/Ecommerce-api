import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { UpdateProductUseCase } from "./update-product";

import { ProductDoesNotExistError } from "./errors/product-does-not-exist-error";

let productsRepository: InMemoryProductsRepository;

let sut: UpdateProductUseCase;

describe("Update Product Use Case", () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();

    sut = new UpdateProductUseCase(productsRepository);
  });

  it("should be able to update product", async () => {
    const casualCategory = await productsRepository.createCategory("CASUAL");

    const sportCategory = await productsRepository.createCategory("SPORT");

    const product = await productsRepository.createProduct({
      name: "Air force",
      price: 400,
      stock: 10,
      description: "Tênis nike air force branco",
      image_url: "example.com",
      category_id: casualCategory.id,
    });

    const { updatedProduct } = await sut.execute(
      {
        name: "Air",
        price: 450,
        categoryName: "SPORT",
      },
      product.id
    );

    expect(updatedProduct.price).toEqual(450);

    expect(updatedProduct.category_id).toEqual(sportCategory.id);
  });

  it("should not be able to update product", async () => {
    await productsRepository.createCategory("SPORT");

    await expect(async () => {
      await sut.execute(
        {
          name: "Air",
          price: 450,
          categoryName: "SPORT",
        },
        ""
      );
    }).rejects.toBeInstanceOf(ProductDoesNotExistError);
  });
});
