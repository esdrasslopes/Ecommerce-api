import { IOrdersRepository } from "@/repositories/repositories-types/orders-repository";

import { OrderItem, OrderStatus } from "@prisma/client";

import { OrderDoesNotExistError } from "../errors/order-does-not-exist-error";

interface GetDetailsOfASpecificOrderUseCaseRequest {
  orderId: string;
}

interface GetDetailsOfASpecificOrderUseCaseResponse {
  order: {
    status: OrderStatus;
    total_price: number;
    items: OrderItem[];
  };
}

export class GetDetailsOfASpecificOrderUseCase {
  private ordersRepository: IOrdersRepository;

  constructor(ordersRepository: IOrdersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute({
    orderId,
  }: GetDetailsOfASpecificOrderUseCaseRequest): Promise<GetDetailsOfASpecificOrderUseCaseResponse> {
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
