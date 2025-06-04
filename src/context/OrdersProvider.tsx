// src/context/OrdersProvider.tsx

import { useState, useEffect, ReactNode } from 'react';
import { OrdersContext } from './OrdersContext';
import { Order } from '../types/order';
import { OrdersContextType } from '../types/OrdersContext';

interface OrdersProviderProps {
  children: ReactNode;
}

export const OrdersProvider = ({ children }: OrdersProviderProps) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/comidas`);
        if (!response.ok) throw new Error('Erro na resposta da API');
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      }
    };

    fetchOrders();
  }, []);

  const addOrder = (order: Order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  const contextValue: OrdersContextType = {
    orders,
    addOrder,
    setOrders,
  };

  return (
    <OrdersContext.Provider value={contextValue}>
      {children}
    </OrdersContext.Provider>
  );
};
