import styles from './Orders.module.css';

function Orders() {
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
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Ana Silva</td>
                        <td>Arroz e Feijão</td>
                        <td>Frango</td>
                        <td>Alface</td>
                        <td>Espaguete</td>
                        <td>Laranja</td>
                        <td>Coca-Cola</td>
                        <td><button className={styles.button}>Editar</button></td>
                    </tr>
                    {/* Adicione mais linhas conforme necessário */}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;
