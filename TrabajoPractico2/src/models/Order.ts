export type PizzaSize = "S" | "M" | "L";
export type OrderStatus = "pending" | "preparing" | "delivered" | "cancelled";

export class Order {
    constructor(
        private id: string,
        private topics: string[],
        private address: string,
        private size: PizzaSize,
        private status: OrderStatus = "pending",
        private price: number = 0
    ) { }

    // Getters
    public getId(): string {
        return this.id;
    }

    public getAddress(): string {
        return this.address;
    }

    public getTopics(): string[] {
        return this.topics;
    }

    public getSize(): PizzaSize {
        return this.size;
    }

    public getStatus(): OrderStatus {
        return this.status;
    }

    public getPrice(): number {
        return this.price;
    }

    // Setters
    public setId(id: string): void {
        this.id = id;
    }
    
    public setStatus(status: OrderStatus): void {
        this.status = status;
    }

    public setPrice(price: number): void {
        this.price = price;
    }
}


