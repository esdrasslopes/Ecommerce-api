import { IOrdersRepository } from "@/repositories/repositories-types/orders-repository";

import { IOrders } from "@/types";

interface GetOrderHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface GetOrderHistoryUseCaseResponse {
  orders: IOrders[];
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

    const ordersHistory: IOrders[] = orders.map((order) => {
      return {
        id: order.id,
        status: order.status,
        created_at: new Date(order.created_at),
        total_price: Number(order.total_price),
        items: order.items?.length ?? 0,
      };
    });

    return { orders: ordersHistory };
  }
}
