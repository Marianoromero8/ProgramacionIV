import request from "supertest";
import { makeApp } from "../../app";
import mockOrderRepo from "../../models/implementations/mockOrder/mockOrder";

// TODO: Hacer para los test unitarios para cada funcion individualmente, dejo estos como ejemplo aunque no sirven sin todas las funciones
// TODO: Recuerden que es con JEST esto

// Antes de cada test, limpiar el mock para evitar interferencias
beforeEach(() => {
    mockOrderRepo.clear();
});

const app = makeApp();

describe("Order API - Integración", () => {
    it("debería crear una orden válida", async () => {
        const res = await request(app).post("/orders").send({
            address: "Calle Falsa 123",
            items: ["muzzarella", "jamón"],
            size: "M"
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("price");
        expect(res.body.size).toBe("M");
    });

    it("debería fallar si la dirección es muy corta", async () => {
        const res = await request(app).post("/orders").send({
            address: "123",
            items: ["muzzarella"],
            size: "S"
        });

        expect(res.statusCode).toBe(422);
        expect(res.body.errors[0].message).toMatch(/al menos 10 caracteres/i);
    });

    it("debería retornar 422 si no se envían ítems", async () => {
        const res = await request(app).post("/orders").send({
            address: "Calle completa",
            items: [],
            size: "L"
        });

        expect(res.statusCode).toBe(422);
        expect(res.body.errors[0].message).toMatch(/al menos un ítem/i);
    });

    it("debería permitir cancelar una orden pendiente", async () => {
        const crear = await request(app).post("/orders").send({
            address: "Calle Falsa 123",
            items: ["pepperoni"],
            size: "S"
        });

        const id = crear.body.id;

        const cancelar = await request(app).post(`/orders/${id}/cancel`);

        expect(cancelar.statusCode).toBe(200);
        expect(cancelar.body.status).toBe("cancelled");
    });

    it("debería devolver 409 si se intenta cancelar una orden entregada", async () => {
        const crear = await request(app).post("/orders").send({
            address: "Calle Falsa 123",
            items: ["pepperoni"],
            size: "M"
        });

        const id = crear.body.id;

        // Simular que fue entregada
        const orden = await mockOrderRepo.getOrder(id);
        orden.setStatus("delivered");

        const cancelar = await request(app).post(`/orders/${id}/cancel`);

        expect(cancelar.statusCode).toBe(409);
        expect(cancelar.body.error).toMatch(/No se puede cancelar un pedido entregado./i);
    });

    it("debería filtrar órdenes por estado", async () => {

        // crear orden 1
        const res1 = await request(app).post("/orders").send({
            address: "Calle falsa 123",
            items: ["muzzarella"],
            size: "M"
        });
        console.log("Creación orden 1 status:", res1.statusCode);
        console.log("Orden 1 body:", res1.body);

        // crear orden 2
        const res2 = await request(app).post("/orders").send({
            address: "Otra calle 456",
            items: ["jamón"],
            size: "L"
        });
        console.log("Creación orden 2 status:", res2.statusCode);
        console.log("Orden 2 body:", res2.body);

        // ver todas las órdenes sin filtro
        const resAll = await request(app).get("/orders");
        console.log("Todas las órdenes:", resAll.body);

        // consulta por estado
        const res = await request(app).get("/orders?status=pending");
        console.log("Órdenes filtradas por estado pending:", res.body);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThanOrEqual(2);
        expect(res.body[0]).toHaveProperty("status", "pending");
    });
});
