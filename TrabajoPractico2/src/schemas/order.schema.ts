import { z } from "zod";

// Posibles tamaños de pizza
export const pizzaSizeEnum = z.enum(["S", "M", "L"]);

// Status posibles de la orden
export const orderStatusEnum = z.enum([
  "pending",
  "cancelled",
  "delivered",
]);

// Schema para crear orden (body)
export const createOrderSchema = z.object({
  address: z.string().min(10, "La dirección debe tener al menos 10 caracteres"),
  items: z.array(z.string()).nonempty("Debe tener al menos un ítem"),
  size: pizzaSizeEnum,
});

// Schema para query status (GET /orders?status=...)
export const statusQuerySchema = z.object({
  status: orderStatusEnum,
});

// Schema para validar params con id
export const idParamSchema = z.object({
  id: z.string().min(1, "El id es requerido"),
});