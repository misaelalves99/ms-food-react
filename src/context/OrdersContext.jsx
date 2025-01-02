import { createContext, useState, useEffect } from 'react';

export const OrdersContext = createContext();

export function OrdersProvider({ children }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Usa a variável de ambiente para a URL da API
                const response = await fetch(`${import.meta.env.VITE_API_URL}/comidas`);
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Erro ao carregar pedidos:', error);
            }
        };

        fetchOrders();
    }, []);

    const addOrder = (order) => {
        setOrders((prevOrders) => [...prevOrders, order]);
    };

    return (
        <OrdersContext.Provider value={{ orders, addOrder, setOrders }}>
            {children}
        </OrdersContext.Provider>
    );
}
