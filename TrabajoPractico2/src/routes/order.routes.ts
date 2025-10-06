import { Router } from "express";
import orderController from "../controllers/order.controller";
import { validate } from "../middlewares/validate";
import { createOrderSchema, statusQuerySchema, idParamSchema } from "../schemas/order.schema";

const router = Router();

// POST /orders
router.post("/", validate(createOrderSchema, "body"), orderController.createOrder);

// GET /orders/all
router.get("/all", orderController.getAllOrders);

// GET /orders/:id
router.get("/:id", validate(idParamSchema, "params"), orderController.getOrder);

// POST /orders/:id/cancel
router.post("/:id/cancel", validate(idParamSchema, "params"), orderController.cancelOrder);

// GET /orders?status=...
router.get("/", validate(statusQuerySchema, "query"), orderController.getOrdersByStatus);

export default router;
