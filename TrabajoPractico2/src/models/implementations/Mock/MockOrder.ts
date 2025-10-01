import {Order, OrderStatus} from '../../Order';
import { OrderCrud } from '../../interface/orderCrud.interface';

export class MockOrder implements OrderCrud{
    protected tam: number;
    protected container: Array<Order>
    constructor(){
        this.tam = 0
        this.container = new Array<Order>
    }

    getOrderById(id: string): Order {
        throw new Error('Method not implemented.');
    }
    getOrderByStatus(status: OrderStatus): Order {
        throw new Error('Method not implemented.');
    }
    postOrder(order: Order): void {
        throw new Error('Method not implemented.');
    }
    cancelOrder(id: string): void {
        throw new Error('Method not implemented.');
    }
    size(): number {
        return this.tam
    }
    
}