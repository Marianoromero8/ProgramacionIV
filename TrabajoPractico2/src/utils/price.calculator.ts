import { PizzaSize } from "../models/order";


// util para la creacion de ordenes
export const BASE_PRICES: Record<PizzaSize, number> = {
  S: 8,
  M: 10,
  L: 12,
};

export const TOPPING_PRICE = 1.5;

export const MAX_TOPPINGS = 5;

export function calculatePrice(size: PizzaSize, toppingsCount: number): number {
  const basePrice = BASE_PRICES[size];
  const toppingsPrice = toppingsCount * TOPPING_PRICE;
  return basePrice + toppingsPrice;
}
