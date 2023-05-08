import { useState, useEffect } from "react";
import {ProfileSteam} from '../components/ProfileSteam.jsx';
import { ProfilePlaystation } from "../components/ProfilePlaystation.jsx";

export function Profile(){
    const [userData, setUserData] = useState([]); //dados usuario do banco
    const [userSteamId, setUserSteamId] = useState(null); //SteamId do usuario do banco, inicia como nulo
    const [userPSName, setUserPSName] = useState(null); //SteamId do usuario do banco, inicia como nulo

    //conferir se o usuario está logado
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        const authToken = localStorage.getItem("AuthToken")

        if (authToken) {
            console.log("Vc esta logado");
            
            (async () => {
                //buscar dados do usuario
                try{
                    const result = await fetch(`http://localhost:3000/user/getUser/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            token: authToken
                        },
                    })
                    const resultado = await result.json()
                    setUserData(resultado.perfil);
                    setUserSteamId(resultado.perfil.SteamId);
                    setUserPSName(resultado.perfil.PSname)
                    
                }catch(err){
                    console.log("erro " + err)
                }
            })();
        } else {
            console.log("Realize seu login")
        }
    }, [])
    
    return(
        <div>
             { /* exibindo dados do usuário do banco */ }
            <h1>Profile</h1>
            <p>{userData.nick}</p>
            <p>{userData.first_name}</p>
            <p>{userData.last_name}</p>
            <br/>

            { /* exibindo dados da steam do usuário */ }

            {userSteamId ? <ProfileSteam steamId={userSteamId}/> : null}
            {userPSName ? <ProfilePlaystation psName={userPSName}/> : null}
        </div>
    )
}