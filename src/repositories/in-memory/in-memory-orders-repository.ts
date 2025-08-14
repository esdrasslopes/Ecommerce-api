import { Order, OrderItem, Prisma } from "@prisma/client";

import { IOrdersRepository } from "../repositories-types/orders-repository";

import { randomUUID } from "crypto";

import { OrderWithItems } from "@/types";

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export class InMemoryOrdersRepository implements IOrdersRepository {
  private orders: OrderWithItems[] = [];

  async createOrder(data: Prisma.OrderUncheckedCreateInput) {
    const order: OrderWithItems = {
      id: randomUUID(),
      status: "PENDING",
      total_price: new Prisma.Decimal(data.total_price as string | number),
      created_at: new Date(),
      user_id: data.user_id,
      items: [],
    };

    this.orders.push(order);

    return order;
  }

  async createOrderItems(data: Prisma.OrderItemUncheckedCreateInput) {
    const orderItem: OrderItem = {
      id: randomUUID(),
      order_id: data.order_id,
      price_at_purchase: new Prisma.Decimal(data.price_at_purchase as number),
      product_id: data.product_id,
      quantity: data.quantity,
    };

    const order = this.orders.find((order) => order.id === data.order_id);

    if (!order) {
      throw new ResourceNotFoundError();
    }

    order.items?.push(orderItem);

    return orderItem;
  }

  async validateOrder(orderId: string) {
    const order = this.orders.find((order) => order.id === orderId);

    if (!order) {
      return null;
    }

    order.status = "COMPLETED";

    return order;
  }
}
