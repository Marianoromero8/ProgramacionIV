import { Order, OrderStatus } from "../order";

export interface OrderCrud {
  // TODO: Cambiar a getAllOrders e implementarlo
  getAllOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order>;
  createOrder(order: Order): Promise<Order>;
  cancelOrder(id: string): Promise<Order>;
  getOrdersByStatus(status: OrderStatus): Promise<Order[]>;
}
