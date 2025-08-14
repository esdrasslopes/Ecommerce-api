import { InMemoryProductsRepository } from "@/repositories/in-memory/in-memory-products-repository";

import { CreateProductUseCase } from "@/use-cases/products/create-product";

export const CreateProducts = async () => {
  const productsRepository = new InMemoryProductsRepository();

  const productUseCase = new CreateProductUseCase(productsRepository);

  const category = await productsRepository.createCategory("CASUAL");

  const { product } = await productUseCase.execute({
    categoryName: category.name,
    name: "Air force",
    price: 500,
    stock: 10,
    description: "",
    image_url: "example",
  });

  return product;
};
