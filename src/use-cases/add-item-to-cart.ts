import { ICartsRepository } from "@/repositories/repositories-types/carts-repository";

import { CartItem } from "@prisma/client";

import { ResourceNotFoundError } from "./errors/resource-not-found-error";

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

  constructor(addItemToCartRepository: ICartsRepository) {
    this.addItemToCartRepository = addItemToCartRepository;
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

    const cartItem = await this.addItemToCartRepository.addItemtoCart(
      cartId,
      productId,
      quantity
    );

    return { cartItem };
  }
}
