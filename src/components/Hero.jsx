import styles from './Hero.module.css';

function Hero() {
    return ( 
        <section className={styles.hero}>
            <div className={styles.heroText}>
                <h1>Bem-vindo ao MSFood</h1>
                <p>Explore as melhores refeições para sua fome!</p>
            </div>
        </section>
    );
}

export default Hero;
