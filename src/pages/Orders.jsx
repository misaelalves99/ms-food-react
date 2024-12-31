import styles from './Orders.module.css';
import { useEffect } from 'react';
import { useContext } from 'react';
import { OrdersContext } from '../context/OrdersContext';

function Orders() {
    const { orders, setOrders } = useContext(OrdersContext); // Acessa orders e setOrders do contexto

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3001/comidas');
                const data = await response.json();
                setOrders(data); // Atualiza o estado global no contexto
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);
            }
        };
        fetchOrders();
    }, [setOrders]); // Adiciona setOrders como dependência

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
                            <td>{Array.isArray(order.suco) ? order.suco.join(', ') : order.suco}</td>
                            <td>{Array.isArray(order.refrigerante) ? order.refrigerante.join(', ') : order.refrigerante}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;
