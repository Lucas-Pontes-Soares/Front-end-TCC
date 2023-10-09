import { useState, useEffect } from "react";
import { ProfileSteam } from '../components/ProfileSteam.jsx';
import { ProfilePlaystation } from "../components/ProfilePlaystation.jsx";
import { ProfileXbox } from "../components/ProfileXbox.jsx";
import { NavbarResponsive } from "../components/NavbarResponsive.jsx";
import styles from '../styles/perfil.module.css'
import { useParams } from 'react-router-dom';

export function Profile() {
    const [userData, setUserData] = useState([]); //dados usuario do banco
    const [userSteamId, setUserSteamId] = useState(null); //SteamId do usuario do banco, inicia como nulo
    const [userPSName, setUserPSName] = useState(null); //userPSName do usuario do banco, inicia como nulo
    const [userXboxToken, setUserXboxToken] = useState(null); //userXboxToken do usuario do banco, inicia como nulo
    const [loginId, setLoginId] = useState(null);

    //coletando o nick passado na url
    const params = useParams();
    const { nickURL } = params;
  
    //conferir se o usuario está logado
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        const authToken = localStorage.getItem("AuthToken")

        if (authToken) {
            console.log("Vc esta logado");

            (async () => {

                //buscar dados do usuario
                try {
                    const result = await fetch(`${process.env.REACT_APP_URLBackend}/user/getUserByNick/${nickURL}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            token: authToken
                        },
                    })
                    const resultado = await result.json();
                    console.log(resultado);
                    setUserData(resultado.perfil);
                    setUserSteamId(resultado.perfil.SteamId);
                    setUserPSName(resultado.perfil.PSname);
                    setUserXboxToken(resultado.perfil.XboxToken);
                    setLoginId(userId);

                } catch (err) {
                    console.log("erro " + err)
                }
            })();
        } else {
            console.log("Realize seu login")
        }
    }, [])

    return (
        <div className='divPrincipal'>
            <NavbarResponsive page="perfil" />
            { /* exibindo dados do usuário do banco */}
            <div className={styles.user}>
                <div className={styles.divFoto}>
                    <img src={userData.image} className={styles.foto} alt="fotoPerfil" heigth="120px" width="140px"/> 
                </div>
                <div className={styles.divDados}>
                    <h1>{userData.nick}</h1>
                    <hr />
                    <p>Nome: {userData.first_name} {userData.last_name}</p>
                </div>
            </div>

            <div className={styles.plataformas}>
                <div className={styles.perfilPlataformas}>
                    Steam
                    <img src= {require('../image/steam.png')} alt="steam" heigth="80px" width="80px"/>
                { userSteamId ? <ProfileSteam steamId={userSteamId}/> : <p>Perfil não sincronizado!</p> }
                </div>
                <div className={styles.perfilPlataformas}>
                    Xbox
                    <img src= {require('../image/xbox.png')} alt="steam" heigth="80px" width="80px"/>
                {/* userXboxToken ? <ProfileXbox loginId={userXboxToken} /> : <p>Perfil não sincronizado!</p>*/ }
                </div>
                <div className={styles.perfilPlataformas}>
                    Playstation
                    <img src= {require('../image/playstation.png')} alt="steam" heigth="80px" width="80px"/> 
                { userPSName ? <ProfilePlaystation psName={userPSName}/> : <p>Perfil não sincronizado!</p> }
                </div>
            </div>
        </div>
    )
}