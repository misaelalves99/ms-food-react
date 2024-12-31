import styles from './Home.module.css';
import Hero from '../components/Hero';
import { useContext, useState } from 'react';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        const newOrder = {
            ...formData,
            status: 'Solicitado',
            id: Date.now().toString(),
        };
    
        addOrder(newOrder); // Adiciona o pedido ao contexto
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
    };

    return (
        <div className={styles.home}>
            <Hero />
            <section className={styles.formSection}>
                <h1 className={styles.title}>Escolha o prato:</h1>
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
                        <option value="Arroz">Arroz</option>
                        <option value="Batata Frita">Batata Frita</option>
                        <option value="Feijão">Feijão</option>
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
                        <option value="Frango">Frango</option>
                        <option value="Carne de Porco">Carne de Porco</option>
                        <option value="Peixe">Peixe</option>
                    </select>
                    {errors.carne && <p className={styles.error}>{errors.carne}</p>}

                    {/* Seções de inputs, acompanhamentos, carnes, saladas, etc., seguem o mesmo padrão */}

                    <label htmlFor="salada" className={styles.label}>Saladas</label>
                    <select
                        id="salada"
                        value={formData.salada}
                        onChange={handleChange}
                        className={styles.select}
                    >
                        <option value="">Selecione um alimento</option>
                        <option value="Alface">Alface</option>
                        <option value="Tomate">Tomate</option>
                        <option value="Cenoura">Cenoura</option>
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
                        <option value="Macarrão">Macarrão</option>
                        <option value="Lasanha">Lasanha</option>
                        <option value="Talharim">Talharim</option>
                    </select>
                    {errors.massa && <p className={styles.error}>{errors.massa}</p>}

                    {/* Outras seções omitidas por simplicidade */}
                    
                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Suco Natural</legend>
                        <div className={styles.checkboxGroup}>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Abacaxi"
                                    id="suco"
                                    checked={formData.suco.includes('Abacaxi')}
                                    onChange={handleChange}
                                /> Abacaxi
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Caju"
                                    id="suco"
                                    checked={formData.suco.includes('Caju')}
                                    onChange={handleChange}
                                /> Caju
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Laranja"
                                    id="suco"
                                    checked={formData.suco.includes('Laranja')}
                                    onChange={handleChange}
                                /> Laranja
                            </label>
                            {/* Outras opções */}
                        </div>
                        {errors.suco && <p className={styles.error}>{errors.suco}</p>}
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Refrigerante</legend>
                        <div className={styles.checkboxGroup}>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Cola"
                                    id="refrigerante"
                                    checked={formData.refrigerante.includes('Cola')}
                                    onChange={handleChange}
                                /> Cola
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Guaraná"
                                    id="refrigerante"
                                    checked={formData.refrigerante.includes('Guaraná')}
                                    onChange={handleChange}
                                /> Guaraná
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Laranja"
                                    id="refrigerante"
                                    checked={formData.refrigerante.includes('Laranja')}
                                    onChange={handleChange}
                                /> Laranja
                            </label>
                            {/* Outras opções */}
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
