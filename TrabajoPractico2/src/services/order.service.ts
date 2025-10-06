import { Order, PizzaSize, OrderStatus } from "../models/order";
import orderRepo from "../models/implementations/mockOrder/mockOrder";

import { calculatePrice, MAX_TOPPINGS } from "../utils/price.calculator";
import mockOrder from "../models/implementations/mockOrder/mockOrder";

export class OrderService {
  async createOrder(data: {
    address: string;
    items: string[];
    size: PizzaSize;
  }): Promise<Order> {
    if (data.items.length === 0) {
      throw new Error("El pedido debe tener al menos un ítem.");
    }

    if (data.items.length > MAX_TOPPINGS) {
      throw new Error("Máximo 5 toppings.");
    }

    const price = calculatePrice(data.size, data.items.length);

    const tempOrder = new Order(
      data.items,
      data.address,
      data.size,
      "", // id vacío
      "pending", // status por defecto
      price
    );

    return await orderRepo.createOrder(tempOrder);
  }

  async getOrder(id: string): Promise<Order> {
    if (!id || !id.trim()) {
      throw new Error("El ID no es correcto");
    }
    try {
      const order = await mockOrder.getOrder(id);
      return order;
    } catch (error) {
      throw new Error("No hay orden con ese ID");
    }
  }

  async cancelOrder(id: string): Promise<Order> {
    return orderRepo.cancelOrder(id);
  }

  async getOrdersByStatus(status?: OrderStatus): Promise<Order[]> {
    return orderRepo.getOrdersByStatus(status);
  }

  async getAllOrders(): Promise<Order[]> {
    return orderRepo.getAllOrders();
  }
}

export default new OrderService();
