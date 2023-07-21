import { NewRequest } from '../components/NewRequest.jsx';
import { GetRequest } from '../components/GetRequest.jsx';
import { useState, useEffect } from "react";
import { NavbarResponsive } from "../components/NavbarResponsive.jsx";
import { GetAllUsers} from '../components/GetAllUsers.jsx'
import  { MagnifyingGlass } from "@phosphor-icons/react";
import '../styles/global.css'
import styles from '../styles/jogadores.module.css'

export function Jogadores() {
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [buscarJogador, setBuscarJogador] = useState(false);

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

  const componenteBuscarJogador = () => {
    setBuscarJogador(!buscarJogador)
  }

  return (
    <div className='divPrincipal'>
      <NavbarResponsive page="jogadores"/>
      <div className={styles.central}>
        <h2>Encontre aqui usuários para jogarem!</h2>
        <button className={styles.newRequest} onClick={componenteBuscarJogador}><MagnifyingGlass /> {buscarJogador ? 'Cancelar Buscar' :  'Buscar Jogador'}</button>
        {buscarJogador && <GetAllUsers />}
        <br />
        <h2>Requisições em busca de players:</h2>
        <button className={styles.newRequest} onClick={toggleComponente}>{mostrarComponente ? 'Cancelar Requisição' : '+ Nova Requisição'}</button>
      </div>

      {mostrarComponente && <NewRequest />}
      <GetRequest />
    </div>
  )
}