import { useState, useEffect } from "react";
import { ProfileSteam } from '../components/ProfileSteam.jsx';
import { ProfilePlaystation } from "../components/ProfilePlaystation.jsx";
import { ProfileXbox } from "../components/ProfileXbox.jsx";
import { Navbar } from '../components/Navbar.jsx'
import styles from '../styles/perfil.module.css'

export function Profile() {
    const [userData, setUserData] = useState([]); //dados usuario do banco
    const [userSteamId, setUserSteamId] = useState(null); //SteamId do usuario do banco, inicia como nulo
    const [userPSName, setUserPSName] = useState(null); //SteamId do usuario do banco, inicia como nulo
    const [loginId, setLoginId] = useState(null);
    //conferir se o usuario está logado
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        const authToken = localStorage.getItem("AuthToken")

        if (authToken) {
            console.log("Vc esta logado");

            (async () => {
                //buscar dados do usuario
                try {
                    const result = await fetch(`http://localhost:3000/user/getUser/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            token: authToken
                        },
                    })
                    const resultado = await result.json();
                    setUserData(resultado.perfil);
                    setUserSteamId(resultado.perfil.SteamId);
                    setUserPSName(resultado.perfil.PSname);
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
            <Navbar page="perfil" />
            { /* exibindo dados do usuário do banco */}
            <div className={styles.user}>
                <h1>{userData.nick}</h1>
                <hr />
                <br />
                <h3>Nome: {userData.first_name}</h3>
                <h3>Sobrenome: {userData.last_name}</h3>
            </div>

            <div className={styles.plataformas}>
                <div className={styles.perfilPlataformas}>
                    Steam
                    <img src= {require('../image/steam.png')} alt="steam" heigth="80px" width="80px"/>
                { userSteamId ? <ProfileSteam steamId={userSteamId}/> : null }
                </div>
                <div className={styles.perfilPlataformas}>
                    Xbox
                    <img src= {require('../image/xbox.png')} alt="steam" heigth="80px" width="80px"/>
                { loginId ? <ProfileXbox loginId={loginId} /> : null }
                </div>
                <div className={styles.perfilPlataformas}>
                    Playstation
                    <img src= {require('../image/playstation.png')} alt="steam" heigth="80px" width="80px"/> 
                {userPSName ? <ProfilePlaystation psName={userPSName}/> : null }
                </div>
            </div>
        </div>
    )
}