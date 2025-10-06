// refactorizado

import { Order, OrderStatus } from "../../order";
import { OrderCrud } from "../../interface/orderCrud.interface";

import { calculatePrice, MAX_TOPPINGS } from "../../../utils/price.calculator";

export class MockOrder implements OrderCrud {
  private container: Order[] = [];
  private idCounter = 1;

  async createOrder(order: Order): Promise<Order> {
    // Validación de toppings
    if (order.getItems().length > MAX_TOPPINGS) {
      throw new Error("Máximo 5 toppings");
    }

    // Calcular precio
    const price = calculatePrice(order.getSize(), order.getItems().length);
    order.setPrice(price);

    // Setear ID autoincremental
    order.setId(this.idCounter.toString());
    this.idCounter++;

    this.container.push(order);
    return order;
  }

  async getOrder(id: string): Promise<Order> {

  }

  async getOrdersByStatus(status?: OrderStatus): Promise<Order[]> {
    if(status){
      return this.container.filter(order => order.getStatus() === status)
    }
    return this.container
  }

  async cancelOrder(id: string): Promise<Order> {
    return new Promise<Order>((resolve, reject) => {
      const OrderEncontrada = this.container.find((order: Order) => order.getId() === id)
      if (!OrderEncontrada) {
        reject(new Error("La orden no existe"))
      } else if (OrderEncontrada.getStatus() === "delivered") {
        reject(new Error("No se puede cancelar un pedido entregado."))
      } else {
        OrderEncontrada.setStatus("cancelled")
        resolve(OrderEncontrada)
      }
    })
  }

  // Implementar getOrders (devuelve todas las órdenes en el container)
  // TOOD: Hacer un getAllOrders como dice en rutas
  async getAllOrders(): Promise<Order[]> {
    return [...this.container];

  }


  // (opcional) limpiar pedidos - útil para tests
  clear(): void {
    this.container = [];
    this.idCounter = 1;
  }
}

export default new MockOrder();
