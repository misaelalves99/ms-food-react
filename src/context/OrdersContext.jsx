import { createContext, useState, useEffect } from 'react';

export const OrdersContext = createContext();

export function OrdersProvider({ children }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3001/comidas');
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
