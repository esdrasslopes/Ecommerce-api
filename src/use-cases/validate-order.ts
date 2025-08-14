import { IOrdersRepository } from "@/repositories/repositories-types/orders-repository";

import { OrderWithItems } from "@/types";

import { OrderDoesNotExistError } from "./errors/order-does-not-exist-error";

interface ValidateOrderUseCaseRequest {
  orderId: string;
}

interface ValidateOrderUseCaseResponse {
  validatedOrder: OrderWithItems;
}

export class ValidateOrderUseCase {
  private ordersRepository: IOrdersRepository;

  constructor(ordersRepository: IOrdersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute({
    orderId,
  }: ValidateOrderUseCaseRequest): Promise<ValidateOrderUseCaseResponse> {
    const order = await this.ordersRepository.validateOrder(orderId);

    if (!order) {
      throw new OrderDoesNotExistError();
    }

    return { validatedOrder: order };
  }
}
