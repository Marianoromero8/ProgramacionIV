import { render, screen, waitFor } from '@testing-library/react';
import Menu from '../src/components/menu';
import { OrderProvider } from '../src/components/pedido';

describe('HU1 — Visualización inicial del menú', () => {
  it('muestra los productos del menú al ingresar', async () => {
    // monta los componentes, msw intercepta las peticiones
    render(
      <OrderProvider>
        <Menu />
      </OrderProvider>
    );
    // espera a que los productos carguen
    await waitFor(() => {
      expect(screen.getByText('Café - $2.50')).toBeInTheDocument();
      expect(screen.getByText('Té - $2.00')).toBeInTheDocument();
      expect(screen.getByText('Sandwich - $5.00')).toBeInTheDocument();
    });

    // verificar que hay varios items
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });
});
