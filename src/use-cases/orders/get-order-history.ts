import { IOrdersRepository } from "@/repositories/repositories-types/orders-repository";

import { OrderWithItems } from "@/types";

interface GetOrderHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface GetOrderHistoryUseCaseResponse {
  orders: OrderWithItems[];
}

export class GetOrderHistoryUseCase {
  private ordersRepository: IOrdersRepository;

  constructor(ordersRepository: IOrdersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async execute({
    userId,
    page,
  }: GetOrderHistoryUseCaseRequest): Promise<GetOrderHistoryUseCaseResponse> {
    const orders = await this.ordersRepository.getOrdersHistory(userId, page);

    return { orders };
  }
}
