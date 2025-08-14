import { IOrdersRepository } from "@/repositories/repositories-types/orders-repository";

import { IProductsRepository } from "@/repositories/repositories-types/products-repository";

import { OrderWithItems } from "@/types";

import { CartItem } from "@prisma/client";

interface CreateOrderUseCaseRequest {
  cartItems: CartItem[];
  userId: string;
}

interface CreateOrderUseCaseResponse {
  order: OrderWithItems;
}

export class CreateOrderUseCase {
  private ordersRepository: IOrdersRepository;

  private productsRepository: IProductsRepository;

  constructor(
    ordersRepository: IOrdersRepository,
    productsRepository: IProductsRepository
  ) {
    this.ordersRepository = ordersRepository;
    this.productsRepository = productsRepository;
  }

  async execute({
    cartItems,
    userId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const productsIds = cartItems.map((item) => item.product_id);

    const productsInCart = await this.productsRepository.findManyByIds(
      productsIds
    );

    const totalPrice = cartItems.reduce((acc, cartItem) => {
      const product = productsInCart.find((p) => p.id === cartItem.product_id);
      if (!product) return acc;
      return acc + Number(product.price) * cartItem.quantity;
    }, 0);

    const order = await this.ordersRepository.createOrder({
      user_id: userId,
      status: "PENDING",
      total_price: totalPrice,
    });

    for (const cartItem of cartItems) {
      const product = productsInCart.find((p) => p.id === cartItem.product_id);

      if (!product) continue;

      await this.ordersRepository.createOrderItems({
        order_id: order.id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
        price_at_purchase: product.price,
      });
    }

    return { order };
  }
}
