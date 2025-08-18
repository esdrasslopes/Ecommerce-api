import { IOrdersRepository } from "@/repositories/repositories-types/orders-repository";

import { OrderWithItems } from "@/types";

interface ListOrdersToValidateUseCaseResponse {
  toValidateOrders: OrderWithItems[];
}

export class ListOrdersToValidateUseCase {
  private ordersRepository: IOrdersRepository;

  constructor(ordersRepository: IOrdersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute(): Promise<ListOrdersToValidateUseCaseResponse> {
    const toValidateOrders = await this.ordersRepository.getOrdersToValidate();

    return { toValidateOrders };
  }
}
