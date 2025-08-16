import { ICartsRepository } from "@/repositories/repositories-types/carts-repository";

import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { CartItems } from "@/types";

interface GetItemsFromCartUseCaseRequest {
  cartId: string;
  page: number;
}

interface GetItemsFromCartUseCaseResponse {
  cartItems: CartItems[];
}

export class GetItemsFromCartUseCase {
  private getItemsFromCartRepository: ICartsRepository;

  private productsRepository: IProductsRepository;

  constructor(
    getItemsFromCartRepository: ICartsRepository,
    productsRepository: IProductsRepository
  ) {
    this.getItemsFromCartRepository = getItemsFromCartRepository;

    this.productsRepository = productsRepository;
  }

  async execute({
    cartId,
    page,
  }: GetItemsFromCartUseCaseRequest): Promise<GetItemsFromCartUseCaseResponse> {
    const cartItems =
      await this.getItemsFromCartRepository.getCartItemsFromCart(cartId, page);

    const cartItemsIds = cartItems.map((item) => item.product_id);

    const itemsFromCart = await this.productsRepository.findManyByIds(
      cartItemsIds
    );

    return { cartItems: itemsFromCart };
  }
}
