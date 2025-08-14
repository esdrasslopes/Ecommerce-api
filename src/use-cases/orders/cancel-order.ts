import { IOrdersRepository } from "@/repositories/repositories-types/orders-repository";

import { OrderWithItems } from "@/types";

import { CancelOrderError } from "../errors/cancel-order-error";

interface CancelOrderUseCaseRequest {
  orderId: string;
}

interface CancelOrderUseCaseResponse {
  canceledOrder: OrderWithItems;
}

export class CancelOrderUseCase {
  private ordersRepository: IOrdersRepository;

  constructor(ordersRepository: IOrdersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute({
    orderId,
  }: CancelOrderUseCaseRequest): Promise<CancelOrderUseCaseResponse> {
    const canceledOrder = await this.ordersRepository.cancelOrder(orderId);

    if (!canceledOrder) {
      throw new CancelOrderError();
    }

    return { canceledOrder };
  }
}
