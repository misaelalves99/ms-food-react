import styles from './Home.module.css';
import Hero from '../components/Hero';
import { useContext, useState, useEffect } from 'react';
import { OrdersContext } from '../context/OrdersContext';

function Home() {
    const { addOrder } = useContext(OrdersContext);

    const [formData, setFormData] = useState({
        nome: '',
        acompanhamentos: '',
        carne: '',
        salada: '',
        massa: '',
        suco: [],
        refrigerante: []
    });

    const [errors, setErrors] = useState({});

    const [options, setOptions] = useState({
        acompanhamentos: [],
        carne: [],
        salada: [],
        massas: [],
        suco: [],
        refrigerante: []
    });

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/cardapio`);
                const data = await response.json();
                setOptions({
                    acompanhamentos: data.acompanhamentos,
                    carne: data.carne,
                    salada: data.salada,
                    massas: data.massas,
                    suco: data['suco natural'],
                    refrigerante: data.refrigerante
                });
            } catch (error) {
                console.error('Erro ao buscar cardápio:', error);
            }
        };

        fetchOptions();
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nome.trim()) {
            newErrors.nome = 'O nome do cliente é obrigatório.';
        }
        if (!formData.acompanhamentos) {
            newErrors.acompanhamentos = 'Escolha um acompanhamento.';
        }
        if (!formData.carne) {
            newErrors.carne = 'Escolha uma carne.';
        }
        if (!formData.salada) {
            newErrors.salada = 'Escolha uma salada.';
        }
        if (!formData.massa) {
            newErrors.massa = 'Escolha uma massa.';
        }
        if (!formData.suco.length) {
            newErrors.suco = 'Escolha pelo menos um suco natural.';
        }
        if (!formData.refrigerante.length) {
            newErrors.refrigerante = 'Escolha pelo menos um refrigerante.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
    
        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                [id]: checked
                    ? [...prev[id], value]
                    : prev[id].filter((item) => item !== value),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [id]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        const newOrder = {
            ...formData,
            status: 'Solicitado',
            id: Date.now().toString(), // ID temporário
        };
    
        try {
            // Adiciona o pedido ao servidor
            const response = await fetch('http://localhost:3001/comidas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao enviar o pedido para o servidor');
            }
    
            const savedOrder = await response.json(); // Resposta com o ID gerado pelo servidor
            addOrder(savedOrder); // Adiciona ao contexto
    
            alert('Pedido enviado com sucesso!');
            setFormData({
                nome: '',
                acompanhamentos: '',
                carne: '',
                salada: '',
                massa: '',
                suco: [],
                refrigerante: [],
            });
        } catch (error) {
            console.error('Erro ao enviar pedido:', error);
            alert('Não foi possível enviar o pedido. Tente novamente.');
        }
    };

    return (
        <div className={styles.home}>
            <Hero />
            <section className={styles.formSection}>
                <h1 className={styles.title}>Escolha o prato:</h1>
                <h2 className={styles.subtitle}>Feito com amor!</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="nome" className={styles.label}>Nome do cliente:</label>
                    <input
                        type="text"
                        id="nome"
                        placeholder="Digite seu nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    {errors.nome && <p className={styles.error}>{errors.nome}</p>}

                    <label htmlFor="acompanhamentos" className={styles.label}>Acompanhamentos</label>
                    <select
                        id="acompanhamentos"
                        value={formData.acompanhamentos}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Selecione um alimento</option>
                        {options.acompanhamentos.map((item) => (
                            <option key={item.id} value={item.tipo}>
                                {item.tipo}
                            </option>
                        ))}
                    </select>
                    {errors.acompanhamentos && <p className={styles.error}>{errors.acompanhamentos}</p>}

                    <label htmlFor="carne" className={styles.label}>Carnes</label>
                    <select
                        id="carne"
                        value={formData.carne}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Selecione um alimento</option>
                        {options.carne.map((item) => (
                            <option key={item.id} value={item.tipo}>
                                {item.tipo}
                            </option>
                        ))}
                    </select>
                    {errors.carne && <p className={styles.error}>{errors.carne}</p>}

                    <label htmlFor="salada" className={styles.label}>Saladas</label>
                    <select
                        id="salada"
                        value={formData.salada}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Selecione um alimento</option>
                        {options.salada.map((item) => (
                            <option key={item.id} value={item.tipo}>
                                {item.tipo}
                            </option>
                        ))}
                    </select>
                    {errors.salada && <p className={styles.error}>{errors.salada}</p>}

                    <label htmlFor="massa" className={styles.label}>Massas</label>
                    <select
                        id="massa"
                        value={formData.massa}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Selecione um alimento</option>
                        {options.massas.map((item) => (
                            <option key={item.id} value={item.tipo}>
                                {item.tipo}
                            </option>
                        ))}
                    </select>
                    {errors.massa && <p className={styles.error}>{errors.massa}</p>}

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Suco Natural</legend>
                        <div className={styles.checkboxGroup}>
                            {options.suco.map((item) => (
                                <label key={item.id}>
                                    <input
                                        type="checkbox"
                                        value={item.tipo}
                                        id="suco"
                                        checked={formData.suco.includes(item.tipo)}
                                        onChange={handleChange}
                                    />
                                    {item.tipo}
                                </label>
                            ))}
                        </div>
                        {errors.suco && <p className={styles.error}>{errors.suco}</p>}
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Refrigerante</legend>
                        <div className={styles.checkboxGroup}>
                            {options.refrigerante.map((item) => (
                                <label key={item.id}>
                                    <input
                                        type="checkbox"
                                        value={item.tipo}
                                        id="refrigerante"
                                        checked={formData.refrigerante.includes(item.tipo)}
                                        onChange={handleChange}
                                    />
                                    {item.tipo}
                                </label>
                            ))}
                        </div>
                        {errors.refrigerante && <p className={styles.error}>{errors.refrigerante}</p>}
                    </fieldset>

                    <button type="submit" className={styles.button}>Fazer Pedido</button>
                </form>
            </section>
        </div>
    );
}

export default Home;
