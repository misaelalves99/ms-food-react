import styles from './Home.module.css';
import Hero from '../components/Hero';

function Home() {
    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <Hero />

            {/* Form Section */}
            <section className={styles.formSection}>
                <h1 className={styles.title}>Escolha o prato:</h1>
                <p className={styles.subtitle}>Feito com amor!</p>
                <form className={styles.form}>
                    <label htmlFor="name" className={styles.label}>Nome do cliente:</label>
                    <input type="text" id="name" placeholder="Digite seu nome" className={styles.input} />

                    <label htmlFor="acompanhamentos" className={styles.label}>Acompanhamentos</label>
                    <select id="acompanhamentos" className={styles.select}>
                        <option>Selecione um alimento</option>
                    </select>

                    <label htmlFor="carne" className={styles.label}>Carnes</label>
                    <select id="carne" className={styles.select}>
                        <option>Selecione um alimento</option>
                    </select>

                    <label htmlFor="salada" className={styles.label}>Saladas</label>
                    <select id="salada" className={styles.select}>
                        <option>Selecione um alimento</option>
                    </select>

                    <label htmlFor="molho" className={styles.label}>Molhos</label>
                    <select id="molho" className={styles.select}>
                        <option>Selecione um alimento</option>
                    </select>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Suco Natural</legend>
                        <div className={styles.checkboxGroup}>
                            <label><input type="checkbox" /> Laranja</label>
                            <label><input type="checkbox" /> Manga</label>
                            <label><input type="checkbox" /> Açaí</label>
                            <label><input type="checkbox" /> Maracujá</label>
                            <label><input type="checkbox" /> Limão</label>
                            <label><input type="checkbox" /> Soja</label>
                        </div>
                    </fieldset>

                    <fieldset className={styles.fieldset}>
                        <legend className={styles.legend}>Refrigerante</legend>
                        <div className={styles.checkboxGroup}>
                            <label><input type="checkbox" /> Coca</label>
                            <label><input type="checkbox" /> Guaraná</label>
                            <label><input type="checkbox" /> Fanta</label>
                            <label><input type="checkbox" /> Sprite</label>
                        </div>
                    </fieldset>

                    <button type="submit" className={styles.button}>Fazer Pedido</button>
                </form>
            </section>
        </div>
    );
}

export default Home;
