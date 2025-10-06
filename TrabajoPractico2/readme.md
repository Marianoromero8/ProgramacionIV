# 🍕 Pizzería API - Sistema de Pedidos

Este proyecto implementa una API REST para gestionar pedidos de una pizzería. Se pueden crear pedidos, cancelarlos, obtener pedidos por ID o filtrar por estado.

## 🚀 Tecnologías usadas

- Node.js + Express
- TypeScript
- Zod (validaciones)
- Jest (tests unitarios e integración)

---

## 📦 Scripts disponibles

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
curl http://localhost:3000/orders
```

## que quiere el profe:

- el coverage al 80% (comando: npx jest --coverage)
- el curl de las consultas de los endpoints (en el readme)
- descripcion del semaforo ( no estoy seguro de como hacerla)
- matriz de casos (tmp estoy seguro de como hacerla)
