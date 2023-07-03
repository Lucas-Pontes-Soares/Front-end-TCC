import { NewRequest } from '../components/NewRequest.jsx';
import { GetRequest } from '../components/GetRequest.jsx';
import { Logout } from '../components/Logout.jsx';
import { useState, useEffect } from "react";
import { Navbar } from '../components/Navbar.jsx'
import '../styles/global.css'
import styles from '../styles/jogadores.module.css'

export function Jogadores() {
  const [mostrarComponente, setMostrarComponente] = useState(false);
  useEffect(() => {
    const authToken = localStorage.getItem("AuthToken")
    if (authToken) {
      console.log("Vc esta logado")
    } else {
      console.log("Realize seu login")
    }
  })

  const toggleComponente = () => {
    setMostrarComponente(!mostrarComponente);
  };

  return (
    <div className='divPrincipal'>
      <Navbar page="jogadores"/>
      <div className={styles.central}>
        <h2>Encontre aqui usuários para jogarem!</h2>
        <button className={styles.newRequest} onClick={toggleComponente}>{mostrarComponente ? 'Cancelar Requisição' : '+ Nova Requisição'}</button>
      </div>

      {mostrarComponente && <NewRequest />}
      <GetRequest />
    </div>
  )
}