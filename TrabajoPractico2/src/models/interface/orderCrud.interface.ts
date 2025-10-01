import { Order, OrderStatus, PizzaSize } from "../Order";


export interface OrderCrud {
    getOrderById(id: string): Order;
    getOrderByStatus(status: OrderStatus): Order;
    postOrder(order: Order): void;
    cancelOrder(id: string): void;
    size(): number;
}