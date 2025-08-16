import { Prisma } from "@prisma/client";

import { IOrdersRepository } from "../repositories-types/orders-repository";

import { prisma } from "@/lib/prisma";

export class PrismaOrdersRepository implements IOrdersRepository {
  async createOrder(data: Prisma.OrderUncheckedCreateInput) {
    const order = await prisma.order.create({
      data,
    });

    return order;
  }

  async createOrderItems(data: Prisma.OrderItemUncheckedCreateInput) {
    const orderItem = await prisma.orderItem.create({
      data,
    });

    return orderItem;
  }

  async validateOrder(orderId: string) {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "COMPLETED",
      },
    });

    return order;
  }

  async cancelOrder(orderId: string) {
    const orderToCancel = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (
      !orderToCancel ||
      orderToCancel.status === "COMPLETED" ||
      orderToCancel.status === "CANCELED"
    ) {
      return null;
    }

    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "CANCELED",
      },
    });

    return order;
  }

  async getOrdersHistory(userId: string, page: number) {
    const orders = await prisma.order.findMany({
      where: {
        user_id: userId,
      },
      include: {
        OrderItem: {
          take: 20,
          skip: (page - 1) * 20,
        },
      },
    });

    const ordersAndItems = orders.map((order) => {
      return {
        id: order.id,
        status: order.status,
        total_price: order.total_price,
        created_at: order.created_at,
        user_id: order.user_id,
        items: order.OrderItem ?? [],
      };
    });

    return ordersAndItems;
  }

  async getDetailsOfASpecificOrder(orderId: string) {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    return order;
  }
}
