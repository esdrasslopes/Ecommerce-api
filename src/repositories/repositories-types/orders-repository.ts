import { OrderWithItems } from "@/types";

import { OrderItem, Prisma } from "@prisma/client";

export interface IOrdersRepository {
  createOrder(data: Prisma.OrderUncheckedCreateInput): Promise<OrderWithItems>;
  createOrderItems(
    data: Prisma.OrderItemUncheckedCreateInput
  ): Promise<OrderItem>;
  validateOrder(orderId: string): Promise<OrderWithItems | null>;
  cancelOrder(orderId: string): Promise<OrderWithItems | null>;
  getOrdersHistory(userId: string): Promise<OrderWithItems[]>;
}
