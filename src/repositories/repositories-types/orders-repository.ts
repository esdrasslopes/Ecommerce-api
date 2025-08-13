import { CartItems, OrderWithItems } from "@/types";

import { OrderItem, Prisma } from "@prisma/client";

export interface IOrdersRepository {
  createOrder(data: Prisma.OrderUncheckedCreateInput): Promise<OrderWithItems>;
  createOrderItems(
    data: Prisma.OrderItemUncheckedCreateInput
  ): Promise<OrderItem>;
}
