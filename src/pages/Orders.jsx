import styles from './Orders.module.css';
import { useEffect, useContext, useState } from 'react';
import { OrdersContext } from '../context/OrdersContext';

function Orders() {
    const { orders, setOrders } = useContext(OrdersContext); // Acessa orders e setOrders do contexto
    const [statuses, setStatuses] = useState([]); // Armazena os status do servidor

    useEffect(() => {
        const fetchOrdersAndStatuses = async () => {
            try {
                const [ordersResponse, statusesResponse] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/comidas`),
                    fetch(`${import.meta.env.VITE_API_URL}/status`)
                ]);
                const ordersData = await ordersResponse.json();
                const statusesData = await statusesResponse.json();
                setOrders(ordersData); // Atualiza o estado global com os pedidos
                setStatuses(statusesData); // Atualiza o estado local com os status
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        fetchOrdersAndStatuses();
    }, [setOrders]);

    // Atualiza o status de um pedido
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await fetch(`http://localhost:3001/comidas/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar o status:', error);
        }
    };

     // Cancela um pedido
     const handleCancelOrder = async (orderId) => {
        try {
            await fetch(`http://localhost:3001/comidas/${orderId}`, {
                method: 'DELETE',
            });
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        } catch (error) {
            console.error('Erro ao cancelar o pedido:', error);
        }
    };

    return (
        <div className={styles.orders}>
            <h1>Pedidos</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cliente</th>
                        <th>Acompanhados</th>
                        <th>Carnes</th>
                        <th>Salada</th>
                        <th>Massas</th>
                        <th>Suco</th>
                        <th>Refrigerante</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td>{order.nome}</td>
                            <td>{order.acompanhamentos || order.companhamentos}</td>
                            <td>{order.carne}</td>
                            <td>{order.salada}</td>
                            <td>{order.massa}</td>
                            <td>
                                {Array.isArray(order.suco) ? (
                                    <ul>
                                        {order.suco.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    order.suco
                                )}
                            </td>
                            <td>
                                {Array.isArray(order.refrigerante) ? (
                                    <ul>
                                        {order.refrigerante.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    order.refrigerante
                                )}
                            </td>

                            <td>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                >
                                    {statuses.map((status) => (
                                        <option key={status.id} value={status.tipo}>
                                            {status.tipo}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button
                                    className={styles.cancelButton}
                                    onClick={() => handleCancelOrder(order.id)}
                                >
                                    Cancelar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;
