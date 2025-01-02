import styles from './Navbar.module.css';
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

function Navbar() {
    return ( 
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={Logo} alt={Logo} />
                </Link>
            </div>
            <nav className={styles.nav}>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/pedidos">Pedidos</Link></li>
                </ul>
            </nav>
        </header>
     );
}

export default Navbar;
