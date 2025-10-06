// test unitarios para la capa de servicios

import OrderService from "../../services/order.service";
import { Order } from "../../models/order";
import orderRepo from "../../models/implementations/mockOrder/mockOrder";

// TODO: Hacer para los test unitarios para cada funcion individualmente, dejo estos como ejemplo aunque no sirven sin todas las funciones
// TODO: Recuerden que es con JEST esto

describe("OrderService - Reglas de negocio", () => {
  // Limpio el mockRepo antes de cada test para empezar limpio
  beforeEach(() => {
    orderRepo.clear();
  });

  // npx jest --coverage para ver el coverage
  // hacer lo del crud en controladores 

  it("no permite cancelar una orden entregada", async () => {
    const orden = new Order(["muzzarella"], "123 Calle", "M");
    const creada = await OrderService.createOrder({
      address: orden.getAddress(),
      items: orden.getItems(),
      size: orden.getSize(),
    });

    // Seteo status a delivered (simulando orden entregada)
    creada.setStatus("delivered");

    await expect(OrderService.cancelOrder(creada.getId())).rejects.toThrow(
      "No se puede cancelar un pedido entregado."
    );
  });

  it("calcula el precio correctamente (size + toppings)", async () => {
    const creada = await OrderService.createOrder({
      address: "123 Calle",
      items: ["muzzarella", "jamón"],
      size: "L",
    });

    // Precio: L=12 + 2 toppings * 1,5 (según tu mockOrder) = 15
    expect(creada.getPrice()).toBe(15);
  });

  it("lanza error si se agregan más de 5 toppings", async () => {
    const toppings = ["a", "b", "c", "d", "e", "f"]; // 6 toppings

    await expect(
      OrderService.createOrder({
        address: "123 Calle",
        items: toppings,
        size: "M",
      })
    ).rejects.toThrow("Máximo 5 toppings.");
  });
});



