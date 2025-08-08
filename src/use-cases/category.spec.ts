import { describe, it, expect, beforeEach } from "vitest";

import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { CategoryUseCase } from "./category";

import { ExistingCategoryError } from "./errors/existing-category-error";

let categoriesRepository: InMemoryProductsRepository;

let sut: CategoryUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    categoriesRepository = new InMemoryProductsRepository();

    sut = new CategoryUseCase(categoriesRepository);
  });

  it("should be able to create a new category", async () => {
    const { category } = await sut.execute({
      categoryName: "CASUAL",
    });

    expect(category.name).toEqual("CASUAL");
  });

  it("should not be able to create a category with same name", async () => {
    await sut.execute({
      categoryName: "CASUAL",
    });

    await expect(async () => {
      await sut.execute({
        categoryName: "CASUAL",
      });
    }).rejects.toBeInstanceOf(ExistingCategoryError);
  });
});
