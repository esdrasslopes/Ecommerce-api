import { ICartsRepository } from "@/repositories/repositories-types/carts-repository";

import { CartItem } from "@prisma/client";

import { CartItemDoesNotExistError } from "../errors/cart-item-does-not-exist-error";

interface GetDetailsOfASpecifCartItemUseCaseRequest {
  id: string;
}

interface GetDetailsOfASpecifCartItemUseCaseResponse {
  cartItem: CartItem;
}

export class GetDetailsOfASpecifCartItemUseCase {
  private cartItemsRepository: ICartsRepository;

  constructor(cartItemsRepository: ICartsRepository) {
    this.cartItemsRepository = cartItemsRepository;
  }

  async execute({
    id,
  }: GetDetailsOfASpecifCartItemUseCaseRequest): Promise<GetDetailsOfASpecifCartItemUseCaseResponse> {
    const cartItem = await this.cartItemsRepository.findCartItemById(id);

    if (!cartItem) {
      throw new CartItemDoesNotExistError();
    }

    return { cartItem };
  }
}
