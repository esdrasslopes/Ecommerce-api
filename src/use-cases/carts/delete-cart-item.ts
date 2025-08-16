import { ICartsRepository } from "@/repositories/repositories-types/carts-repository";

import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { CartItem } from "@prisma/client";

import { CartItemDoesNotExistError } from "../errors/cart-item-does-not-exist-error";

interface DeleteCartItemUseCaseRequest {
  cartItemId: string;
  cartId: string;
}

interface DeleteCartItemUseCaseResponse {
  deletedCartItem: CartItem;
}

export class DeleteCartItemUseCase {
  private cartItemsRepository: ICartsRepository;

  private productsRepository: IProductsRepository;

  constructor(
    cartItemsRepository: ICartsRepository,
    productsRepository: IProductsRepository
  ) {
    this.cartItemsRepository = cartItemsRepository;
    this.productsRepository = productsRepository;
  }

  async execute({
    cartItemId,
    cartId,
  }: DeleteCartItemUseCaseRequest): Promise<DeleteCartItemUseCaseResponse> {
    const deletedCartItem = await this.cartItemsRepository.deleteCartItem(
      cartId,
      cartItemId
    );

    if (!deletedCartItem) {
      throw new CartItemDoesNotExistError();
    }

    await this.productsRepository.updateProductStock(
      deletedCartItem.product_id,
      0,
      deletedCartItem.quantity
    );

    return { deletedCartItem };
  }
}
