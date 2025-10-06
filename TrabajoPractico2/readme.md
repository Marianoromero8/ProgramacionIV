# Pizzería API - Sistema de Pedidos

Este proyecto implementa una API REST para gestionar pedidos de una pizzería. Se pueden crear pedidos, cancelarlos, obtener pedidos por ID o filtrar por estado.

## Tecnologías usadas

- Node.js + Express
- TypeScript
- Zod (validaciones)
- Jest (tests unitarios e integración)

---

## Scripts disponibles

```bash
# Instalar dependencias
npm install

# Compilar TypeScript en modo watch
npm run build

# Correr la app en desarrollo con ts-node-dev, en otra terminal (para usar postman)
npm run dev

# Ejecutar tests unitarios (en otra terminal)
npm run test

# Ver reporte de cobertura
npm run test:coverage
```

## Curl

# Crear una orden POST

```bash
curl -X POST http://localhost:3000/orders \
-H "Content-Type: application/json" \
-d '{
"address": "Martin Rodriguez 2140",
"items": ["salsa", "Muzza"],
"size": "M"
}'
```

# Obtener orden por ID GET

```bash
curl http://localhost:3000/orders/<IDorder>
```

# Cancelar una orden

```bash
curl -X POST http://localhost:3000/orders/<IDorder>/cancel
```

# Obtener orden por status

```bash
curl http://localhost:3000/orders?status=<estadoAConsultar>
```

# Obtener todas las ordenes

```bash
curl http://localhost:3000/orders/all
```

## Matriz de casos:
| ID    | Caso / Descripción                          | Precondición                      | Input                                                           | Acción                       | Resultado esperado                                   | Test                                                            |
| ----- | ------------------------------------------- | --------------------------------- | --------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| CA1   | Crear una orden correctamente               | Repo limpio                       | address: "123 Calle Falsa", items: ["queso","jamón"], size: "M" | createOrder                  | Orden creada con id, price > 0, status "pending"     | debería crear una orden válida                                  |
| CA2   | No permite cancelar orden entregada         | Orden creada y status "delivered" | id de la orden creada                                           | cancelOrder                  | Error "No se puede cancelar un pedido entregado."    | no permite cancelar una orden entregada                         |
| CA3   | Calcula precio correctamente                | Repo limpio                       | address: "123 Calle", items: ["muzzarella","jamón"], size: "L"  | createOrder                  | Precio calculado correctamente                       | calcula el precio correctamente                                 |
| CA4   | Error si más de 5 toppings                  | Repo limpio                       | address: "123 Calle", items: 6 toppings                         | createOrder                  | Lanza error "Máximo 5 toppings."                     | lanza error si se agregan más de 5 toppings                     |
| CA5   | Cancela orden correctamente si no entregada | Orden creada con status "pending" | id de la orden creada                                           | cancelOrder                  | Status cambia a "cancelled"                          | cancela una orden correctamente                                 |
| INT1  | Crear orden válida vía API                  | Repo limpio                       | POST /orders body                                               | HTTP POST /orders            | 201 Created, respuesta con id, price, size correcto  | debería crear una orden válida                                  |
| INT2  | Fallar si dirección muy corta               | Repo limpio                       | POST /orders body con dirección corta                           | HTTP POST /orders            | 422 Unprocessable Entity, error validación dirección | debería fallar si la dirección es muy corta                     |
| INT3  | Fallar si no se envían ítems                | Repo limpio                       | POST /orders body con items = []                                | HTTP POST /orders            | 422 Unprocessable Entity, error validación items     | debería retornar 422 si no se envían ítems                      |
| INT4  | Permitir cancelar orden pendiente           | Orden creada vía API              | POST /orders + POST /orders/:id/cancel                          | HTTP POST /orders/:id/cancel | 200 OK, status = "cancelled"                         | debería permitir cancelar una orden pendiente                   |
| INT5  | Error 409 si se cancela orden entregada     | Orden creada y status "delivered" | POST /orders + POST /orders/:id/cancel                          | HTTP POST /orders/:id/cancel | 409 Conflict, error "no se puede cancelar"           | debería devolver 409 si se intenta cancelar una orden entregada |
| INT6  | Filtrar órdenes por estado                  | Varias órdenes creadas            | GET /orders?status=pending                                      | HTTP GET /orders             | 200 OK, lista órdenes con status = "pending"         | debería filtrar órdenes por estado                              |
| INT7  | Obtener orden por ID                        | Orden creada vía API              | GET /orders/:id                                                 | HTTP GET /orders/:id         | 200 OK, orden con ID solicitado                      | debería obtener una orden por ID                                |
| INT8  | Error 404 si ID no existe en getOrder       | Repo limpio o id inválido         | GET /orders/9999                                                | HTTP GET /orders/:id         | 404 Not Found, error "Orden no encontrada"           | debería devolver 404 si el ID no existe en getOrder             |
| INT9  | Error 422 si estado en query no válido      | Repo limpio                       | GET /orders?status=noexiste                                     | HTTP GET /orders             | 422 Unprocessable Entity                             | debería devolver 422 si el estado en el query no es válido      |
| INT10 | Error 404 si ID inválido en cancel          | Repo limpio o id inválido         | POST /orders/ /cancel (id inválido)                             | HTTP POST /orders/:id/cancel | 404 Not Found                                        | debería devolver 404 si el id en params no es válido            |


