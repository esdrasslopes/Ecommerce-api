import { ICartRepository } from "@/repositories/repositories-types/carts-repository";

import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { CartItems } from "@/types";

interface GetItemsFromCartUseCaseRequest {
  cartId: string;
}

interface GetItemsFromCartUseCaseResponse {
  cartItems: CartItems[];
}

export class GetItemsFromCartUseCase {
  private getItemsFromCartRepository: ICartRepository;

  private productsRepository: IProductsRepository;

  constructor(
    getItemsFromCartRepository: ICartRepository,
    productsRepository: IProductsRepository
  ) {
    this.getItemsFromCartRepository = getItemsFromCartRepository;

    this.productsRepository = productsRepository;
  }

  async execute({
    cartId,
  }: GetItemsFromCartUseCaseRequest): Promise<GetItemsFromCartUseCaseResponse> {
    const cartItems =
      await this.getItemsFromCartRepository.getCartItemsFromCart(cartId);

    const cartItemsIds = cartItems.map((item) => item.product_id);

    const itemsFromCart = await this.productsRepository.findManyByIds(
      cartItemsIds
    );

    return { cartItems: itemsFromCart };
  }
}
