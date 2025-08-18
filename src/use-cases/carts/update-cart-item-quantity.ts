import { ICartsRepository } from "@/repositories/repositories-types/carts-repository";

import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { CartItem } from "@prisma/client";

import { CartItemDoesNotExistError } from "../errors/cart-item-does-not-exist-error";

interface UpdateCartItemQuantityUseCaseRequest {
  cartItemId: string;
  newQuantity: number;
}

interface UpdateCartItemQuantityUseCaseResponse {
  cartItem: CartItem;
}

export class UpdateCartItemQuantityUseCase {
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
    newQuantity,
  }: UpdateCartItemQuantityUseCaseRequest): Promise<UpdateCartItemQuantityUseCaseResponse> {
    const cartItem = await this.cartItemsRepository.findCartItemById(
      cartItemId
    );

    if (!cartItem) {
      throw new CartItemDoesNotExistError();
    }

    const updatedCartItem =
      await this.cartItemsRepository.updateCartItemQuantity(
        cartItemId,
        newQuantity
      );

    await this.productsRepository.updateProductStock(
      updatedCartItem.product_id,
      newQuantity,
      cartItem?.quantity!
    );

    return { cartItem: updatedCartItem };
  }
}
