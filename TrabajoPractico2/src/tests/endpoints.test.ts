import { describe, test, expect } from 'vitest';
import { Order, PizzaSize } from '../models/Order';
import { MockOrder } from '../models/implementations/Mock/MockOrder';
import { OrderCrud } from '../models/interface/orderCrud.interface';


describe('prueba de OrderCrud', () => {
    const size: PizzaSize = 'L'
    const topics: string[] = ["Muzzarella, Jamón"]
    const order: Order = new Order("1", topics, 'Los areneros 2511', size, 'pending', 3000)
    const crud: OrderCrud = new MockOrder()



    //Fran
    test('postOrder', () => {
        crud.postOrder(order)
        expect(crud.size()).toBe(1)
    })

    //Mariano
    test('getOrderById', () => {
        crud.postOrder(order)
        expect(crud.size()).toBe(1)
    })

    //Lucho
    test('getOrderByStatus', () => {
        crud.postOrder(order)
        expect(crud.size()).toBe(1)
    })

    //Marcos
    test('cancelOrder', () => {
        crud.postOrder(order)
        expect(crud.size()).toBe(1)
    })




})