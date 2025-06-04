// src/components/Footer.tsx

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h1>
        © 2024 <a href="/" className={styles.link}>MSFood</a>. Todos os direitos reservados.
      </h1>
    </footer>
  );
};

export default Footer;
