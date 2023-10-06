import { useState, useEffect } from 'react';
import '../styles/novaNavbar.css';
import blur from '../image/blur.png';

export function NavbarResponsive(props) {
    const [currentPage, setCurrentPage] = useState(props.page);
    const [entrar, setEntrar] = useState(props.entrar);

    console.log(currentPage);

    async function myFunction(){
        var x = document.getElementById("myTopnav");
        
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
    
  return (
    <div className="topnav" id="myTopnav">
        <a href="">
            <img src={require('../image/logoGPLink.png')} alt="Logo"id="logoGPlink"/>
        </a>
        <a href={`${process.env.REACT_APP_URLFrontend}`} className={currentPage === 'home' ? `selected homeBackground teste` : 'notSelected teste'}>
            Home
        </a>
        {/* Se NÃO estiver logado exibe o botão de entrar, se estiver logado exibe as outras páginas*/}
        {entrar === 'true' ? 
            <>
                <a href={`${process.env.REACT_APP_URLFrontend}/entrar`} className={currentPage === 'entrar' ? `selected homeBackground teste` : 'notSelected teste'}>
                    Entrar
                </a>
            </>
            :
            <>
                <a href={`${process.env.REACT_APP_URLFrontend}/jogadores`} className={currentPage === 'jogadores' ? `selected homeBackground teste` : 'notSelected teste'}>
                    Jogadores
                </a>
                <a href={`${process.env.REACT_APP_URLFrontend}/profile/` + localStorage.getItem("nick")} className={currentPage === 'perfil' ? `selected homeBackground teste` : 'notSelected teste'}>
                    Perfil
                </a>
                <a href={`${process.env.REACT_APP_URLFrontend}/profileConfigurations`} id="config" className={currentPage === 'config' ? `selected homeBackground` : 'notSelected'}>
                    <img src={require('../image/iconConfig.png')} alt="Config" />
                </a>
            </>}
            <a className="icon" onClick={myFunction}>
                <i className="fa fa-bars">&#9776;</i>
            </a>
    </div>
  );
}