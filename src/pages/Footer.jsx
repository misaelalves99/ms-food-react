import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {
    return ( 
        <footer className={styles.footer}>
            <h1>© 2024 <Link to="/">MSFood</Link>. Todos os direitos reservados.</h1>
        </footer>
    );
}

export default Footer;
