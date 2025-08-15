import { ICartsRepository } from "@/repositories/repositories-types/carts-repository";

import { CartItem } from "@prisma/client";

import { ResourceNotFoundError } from "../errors/resource-not-found-error";

import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { ProductWithInsufficientStockError } from "../errors/product-with-insufficient-stock-error";

interface AddItemToCartUseCaseRequest {
  cartId: string;
  productId: string;
  quantity: number;
}

interface AddItemToCartUseCaseResponse {
  cartItem: CartItem;
}

export class AddItemToCartUseCase {
  private addItemToCartRepository: ICartsRepository;

  private productsRepository: IProductsRepository;

  constructor(
    addItemToCartRepository: ICartsRepository,
    productsRepository: IProductsRepository
  ) {
    this.addItemToCartRepository = addItemToCartRepository;
    this.productsRepository = productsRepository;
  }

  async execute({
    cartId,
    productId,
    quantity,
  }: AddItemToCartUseCaseRequest): Promise<AddItemToCartUseCaseResponse> {
    const cart = await this.addItemToCartRepository.findCartById(cartId);

    if (!cart) {
      throw new ResourceNotFoundError();
    }

    const product = await this.productsRepository.findProductById(productId);

    if (product && product.stock < quantity) {
      throw new ProductWithInsufficientStockError();
    }

    await this.productsRepository.updateProductStock(
      productId,
      quantity,
      "decrement"
    );

    const cartItem = await this.addItemToCartRepository.addItemtoCart(
      cartId,
      productId,
      quantity
    );

    return { cartItem };
  }
}
