import { Request, Response } from "express";
import orderService from "../services/order.service";
import { z } from "zod";
import { createOrderSchema, statusQuerySchema } from "../schemas/order.schema";

export class OrderController {
    async createOrder(req: Request, res: Response) {
        try {
            const parsed = createOrderSchema.parse(req.body);
            const order = await orderService.createOrder(parsed);
            res.status(201).json(order);
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                return res.status(422).json({ error: err.issues  });
            }
            res.status(400).json({ error: err.message });
        }
    }

    async getOrder(req: Request, res: Response) {
        // como req.params.id puede ser string | undefined, pero en OrderService las funciones esperan un string garantizado.
        // hacemos una validacion aqui, 
        // TODO: (no se si el get order y el cancel order quieren hacer algo distinto con la validacion al principio)

        // esto es solo una validacion
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID es requerido" });
        }
        // el codigo de la funcion iria aca


    }

    async cancelOrder(req: Request, res: Response) {
        // como req.params.id puede ser string | undefined, pero en OrderService las funciones esperan un string garantizado.
        // TODO: (no se si el get order y el cancel order quieren hacer algo distinto con la validacion al principio)

        // esto es solo una validacion
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID es requerido" });
        }
        // el codigo de la funcion iria aca

    }

    async getOrdersByStatus(req: Request, res: Response) {

    }
    // TODO: Esta seria para julian?
    async getAllOrders(_: Request, res: Response) {
    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).json({orders});
    }   catch (error) {
        if (error instanceof Error ) {
        return res.status(404).json({ message: error.message });
    }

    }
}
}

export default new OrderController();
