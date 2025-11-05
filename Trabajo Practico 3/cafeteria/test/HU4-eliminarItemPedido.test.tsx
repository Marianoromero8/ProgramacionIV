import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from '../src/components/menu';
import { OrderProvider } from '../src/components/pedido';
import OrderSummary from '../src/components/orderSumary';

test('elimina un producto del pedido sin borrar todo', async () => {
  render(
    <OrderProvider>
      <Menu />
      <OrderSummary />
    </OrderProvider>
  );

  // agregar cafe y te al pedido
  const cafeButton = await screen.findByRole('button', { name: /Agregar Café/i });
  const teButton = await screen.findByRole('button', { name: /Agregar Té/i });

  await userEvent.click(cafeButton);
  await userEvent.click(teButton);

  // ver si estan
  await waitFor(() => {
    const orderList = screen.getByRole('list', { name: /pedido/i });
    expect(orderList).toHaveTextContent('Café');
    expect(orderList).toHaveTextContent('Té');
  });

  // eliminar el elemento te
  const orderList = screen.getByRole('list', { name: /pedido/i });
  const teItem = within(orderList).getByText((content, element) =>
    element?.tagName.toLowerCase() === 'li' && content.includes('Té')
  );
  const eliminarTe = within(teItem).getByRole('button', { name: /Eliminar/i });
  await userEvent.click(eliminarTe);

  // verificar que solo quedo el cafe
  await waitFor(() => {
    const updatedOrderList = screen.getByRole('list', { name: /pedido/i });
    expect(updatedOrderList).toHaveTextContent('Café');
    expect(updatedOrderList).not.toHaveTextContent('Té');
    expect(screen.getByText(/Total: \$2.50/i)).toBeInTheDocument();
  });
});

