import { ICartsRepository } from "@/repositories/repositories-types/carts-repository";

import { CartItem } from "@prisma/client";

interface UpdateCartItemQuantityUseCaseRequest {
  cartItemId: string;
  quantity: number;
}

interface UpdateCartItemQuantityUseCaseResponse {
  cartItem: CartItem;
}

export class UpdateCartItemQuantityUseCase {
  private cartItemsRepository: ICartsRepository;

  constructor(cartItemsRepository: ICartsRepository) {
    this.cartItemsRepository = cartItemsRepository;
  }

  async execute({
    cartItemId,
    quantity,
  }: UpdateCartItemQuantityUseCaseRequest): Promise<UpdateCartItemQuantityUseCaseResponse> {
    const cartItem = await this.cartItemsRepository.updateCartItemQuantity(
      cartItemId,
      quantity
    );

    return { cartItem };
  }
}
