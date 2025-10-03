import express from 'express';
import cors from 'cors';
import orderRoutes from './routes/order.routes';

// no se si quieren hacerlo asi o como lo hizo el profe en la practica
// no estoy seguro si habria que modificar algo

// igual el profe me dijo que estaba bien asi
export function makeApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/orders', orderRoutes);

  return app;
}
