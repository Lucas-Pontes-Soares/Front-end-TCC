import { useState, useEffect } from 'react';
import styles from '../styles/navbar.module.css';
import blur from '../image/blur.png';

export function Navbar(props) {
  const [currentPage, setCurrentPage] = useState(props.page);
  const [entrar, setEntrar] = useState(props.entrar);

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
        {/*Se estiver na tela de entrar, exibir na navbar somente home e entrar 
           Se estiver em outra tela, exibir na navbar todas as outras páginas
        */}
        {entrar === 'true' ? 
        <>
          <div className={styles.entrar}>
            <a href="http://localhost:3006/entrar" className={currentPage === 'entrar' ? `${styles.selected} ${styles.homeBackground}` : styles.notSelected}>
              Entrar
            </a>
          </div>
        </>
        :
        <>
          <div className={styles.jogadores}>
            <a href="http://localhost:3006/jogadores" className={currentPage === 'jogadores' ? `${styles.selected} ${styles.homeBackground}` : styles.notSelected}>
              Jogadores
            </a>
          </div>
          <div className={styles.perfil}>
            <a href={"http://localhost:3006/profile/" + localStorage.getItem("nick")} className={currentPage === 'perfil' ? `${styles.selected} ${styles.homeBackground}` : styles.notSelected}>
              Perfil
            </a>
          </div>
          <div className={styles.config}>
            <a href="http://localhost:3006/profileConfigurations" className={currentPage === 'config' ? `${styles.selected} ${styles.homeBackground}` : styles.notSelected}>
              <img src={require('../image/iconConfig.png')} alt="Config" />
            </a>
          </div>
        </>
      }
      </div>
    </div>
  );
}