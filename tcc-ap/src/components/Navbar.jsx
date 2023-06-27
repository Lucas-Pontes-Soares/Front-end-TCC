import { useState } from 'react';
import styles from '../styles/navbar.module.css';
import blur from '../image/blur.png';

export function Navbar(props) {
  const [currentPage, setCurrentPage] = useState(props.page);

  console.log(currentPage);
  return (
    <div className={styles.body}>
      <div className={styles.navbar} id="navbar">
        <div id="logo" className={styles.logo}>
          <a href="">
            <img src={require('../image/logoGPLink.png')} alt="Logo" />
          </a>
        </div>
        <div className={styles.home}>
        <a href="http://localhost:3006/" className={currentPage === 'home' ? `${styles.selected} ${styles.homeBackground}` : styles.notSelected}>
            Home
        </a>
        </div>
        <div className={styles.jogadores}>
          <a href="http://localhost:3006/" className={currentPage === 'jogadores' ? `${styles.selected} ${styles.homeBackground}` : styles.notSelected}>
            Jogadores
          </a>
        </div>
        <div className={styles.perfil}>
          <a href="http://localhost:3006/profile" className={currentPage === 'perfil' ? `${styles.selected} ${styles.homeBackground}` : styles.notSelected}>
            Perfil
          </a>
        </div>
        <div className={styles.config}>
          <a href="http://localhost:3006/profileConfigurations" className={currentPage === 'config' ? `${styles.selected} ${styles.homeBackground}` : styles.notSelected}>
            <img src={require('../image/iconConfig.png')} alt="Config" />
          </a>
        </div>
      </div>
    </div>
  );
}