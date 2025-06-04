// src/components/Navbar.tsx

import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import Logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={Logo} alt="Logo" width={120} height={40} />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/orders">Pedidos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
