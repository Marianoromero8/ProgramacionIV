import { useState } from 'react';
import { useOrder } from './pedido';

export default function OrderSummary() {
  const { order, removeFromOrder, clearOrder } = useOrder();
  const [message, setMessage] = useState('');

  // HU3: calcular total del pedido
  const total = order.reduce((sum, product) => sum + product.price, 0);

  // HU5: enviar pedido
  const handleSendOrder = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      const data = await res.json();
      setMessage(data.message);
      clearOrder(); // HU5: limpiar pedido tras enviar
    } catch {
      setMessage('Error al enviar pedido'); // HU6: manejo de error
    }
  };

  return (
    <section>
      <h2>Pedido</h2>
      <ul role="list" aria-label="pedido">
        {/* {order.map(product => ( */}
        {order.map((product, index) => (
          // <li key={product.id}>
          <li key={`${product.id}-${index}`}> {/* para evitar warning cuando agregamos dos productos iguales al pedido */}
            {product.name} - ${product.price.toFixed(2)}
            <button
              onClick={e => {
                e.stopPropagation(); // evita conflictos si se anidan botones
                removeFromOrder(index);
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handleSendOrder}>Enviar pedido</button>
      {message && <p>{message}</p>}
    </section>
  );
}



