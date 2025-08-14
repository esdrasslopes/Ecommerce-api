import { IOrdersRepository } from "@/repositories/repositories-types/orders-repository";

import { OrderItem, OrderStatus } from "@prisma/client";

import { OrderDoesNotExistError } from "../errors/order-does-not-exist-error";

interface GetDetailsOfASpecificOrderRequest {
  orderId: string;
}

interface GetDetailsOfASpecificOrderResponse {
  order: {
    status: OrderStatus;
    total_price: number;
    items: OrderItem[];
  };
}

export class GetDetailsOfASpecificOrder {
  private ordersRepository: IOrdersRepository;

  constructor(ordersRepository: IOrdersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute({
    orderId,
  }: GetDetailsOfASpecificOrderRequest): Promise<GetDetailsOfASpecificOrderResponse> {
    const order = await this.ordersRepository.getDetailsOfASpecificOrder(
      orderId
    );

    if (!order) {
      throw new OrderDoesNotExistError();
    }

    return {
      order: {
        status: order.status,
        total_price: Number(order.total_price),
        items: order.items ?? [],
      },
    };
  }
}
