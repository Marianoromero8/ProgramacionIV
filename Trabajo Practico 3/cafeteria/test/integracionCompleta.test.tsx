// src/test/integracionCompleta.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from '../src/components/menu';
import OrderSummary from '../src/components/orderSumary';
import { OrderProvider } from '../src/components/pedido';
import { server } from '../src/mocks/server';
import { http, HttpResponse } from 'msw'; // version de "msw": "^2.11.6"

test('flujo completo: cargar menú, agregar, total, enviar y reset', async () => {
  // Mock temporal del menu y del post
  server.use(
    http.get('/api/menu', () =>
      HttpResponse.json([
        { id: '1', name: 'Café', price: 2.5 },
        { id: '2', name: 'Té', price: 2 },
        { id: '3', name: 'Sandwich', price: 5 },
      ])
    )
  );

  server.use(
    http.post('/api/orders', () => HttpResponse.json({ message: 'Pedido confirmado' }))
  );

  render(
    <OrderProvider>
      <Menu />
      <OrderSummary />
    </OrderProvider>
  );

  // espera a que cargue el menu y agrega productos al pedido
  const cafeButton = await screen.findByRole('button', { name: /Agregar Café/i });
  const teButton = await screen.findByRole('button', { name: /Agregar Té/i });
  const sandwichButton = await screen.findByRole('button', { name: /Agregar Sandwich/i });

  await userEvent.click(cafeButton);
  await userEvent.click(teButton);
  await userEvent.click(sandwichButton);

  // verifica que esten los producto y el total
  await waitFor(() => {
    const orderList = screen.getByRole('list', { name: /pedido/i });
    expect(orderList).toHaveTextContent('Café');
    expect(orderList).toHaveTextContent('Té');
    expect(orderList).toHaveTextContent('Sandwich');
  });

  expect(screen.getByText(/Total: \$9.50/i)).toBeInTheDocument();

  // envia y confirma el envio
  const enviarButton = screen.getByRole('button', { name: /Enviar pedido/i });
  await userEvent.click(enviarButton);

  await waitFor(() => {
    expect(screen.getByText(/Pedido confirmado/i)).toBeInTheDocument();
  });

  // lista vacia y reseteado
  const orderList = screen.getByRole('list', { name: /pedido/i });
  expect(orderList).toBeEmptyDOMElement();

  expect(screen.getByText(/Total: \$0.00/i)).toBeInTheDocument();
});
