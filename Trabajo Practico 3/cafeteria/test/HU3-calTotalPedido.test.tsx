import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from '../src/components/menu';
import { OrderProvider } from '../src/components/pedido';
import OrderSummary from '../src/components/orderSumary';

test('calcula el total actualizado al agregar productos', async () => {
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

  // espera a que OrderSummary se actualice
  await waitFor(() => {
    const orderList = screen.getByRole('list', { name: /pedido/i });
    expect(orderList).toHaveTextContent('Café');
    expect(orderList).toHaveTextContent('Té');
  });

  // cafe 2.5 + te 2 = 4.5
  await waitFor(() => {
    expect(screen.getByText(/Total: \$4.50/i)).toBeInTheDocument();
  });

  // agrega otro cafe para que se actualice a 7 el monto
  await userEvent.click(cafeButton);

  await waitFor(() => {
    expect(screen.getByText(/Total: \$7.00/i)).toBeInTheDocument();
  });
});


