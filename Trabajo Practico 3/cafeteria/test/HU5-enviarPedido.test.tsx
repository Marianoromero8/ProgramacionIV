import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from '../src/components/menu';
import { OrderProvider } from '../src/components/pedido';
import OrderSummary from '../src/components/orderSumary';
import { server } from '../src/mocks/server';
import { http, HttpResponse } from 'msw';

test('envía el pedido y confirma', async () => {
  // Mock del endpoint /api/orders usando http.post
  server.use(
    http.post('/api/orders', () => {
      return HttpResponse.json({ message: 'Pedido confirmado' }, { status: 200 });
    })
  );

  render(
    <OrderProvider>
      <Menu />
      <OrderSummary />
    </OrderProvider>
  );

  const cafeButton = await screen.findByRole('button', { name: /Agregar Café/i });
  const teButton = await screen.findByRole('button', { name: /Agregar Té/i });
  await userEvent.click(cafeButton);
  await userEvent.click(teButton);

  // envia el pedido
  const enviarButton = screen.getByRole('button', { name: /Enviar pedido/i });
  await userEvent.click(enviarButton);

  // espera a la confirmacion
  await waitFor(() => {
    expect(screen.getByText(/Pedido confirmado/i)).toBeInTheDocument();
  });

  // lista de edido vacia
  const orderList = screen.getByRole('list', { name: /pedido/i });
  expect(orderList).toBeEmptyDOMElement();
});

