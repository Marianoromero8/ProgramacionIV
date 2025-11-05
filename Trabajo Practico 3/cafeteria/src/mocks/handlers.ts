import {  http, HttpResponse } from 'msw';

export const handlers = [
  //menu
  http.get('/api/menu', () => {
    return HttpResponse.json([
        { id: '1', name: 'Café', price: 2.5 },
        { id: '2', name: 'Té', price: 2 },
        { id: '3', name: 'Sandwich', price: 5 },
      ])
    
  }),
  //metodo post
  http.post('/api/orders', () =>
    HttpResponse.json({ message: 'Pedido confirmado' })
  ),

];
