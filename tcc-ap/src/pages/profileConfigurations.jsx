import { useState, useEffect } from "react";

import {Input} from '../components/Input.jsx'
import {Button} from '../components/Button.jsx'
import { GetRequestByUserId } from '../components/GetRequestByUserId.jsx';
import { Navbar } from '../components/Navbar.jsx'

export function ProfileConfigurations(){
    const [userData, setUserData] = useState([]);

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
                    
                }catch(err){
                    console.log("erro " + err)
                }
            })();
        } else {
            console.log("Realize seu login")
        }
    }, [])

    async function atualizarDados(){
        const first_name = document.getElementById("first_name");
        const last_name = document.getElementById("last_name")
        const nick = document.getElementById("nick")
        const email = document.getElementById("email")
        const steamId = document.getElementById("steam")
        const PSname = document.getElementById("ps")

        const userId = localStorage.getItem("userId")
        const authToken = localStorage.getItem("AuthToken")

        const requestBody = {
            first_name: first_name.value || userData.first_name,
            last_name: last_name.value || userData.last_name,
            nick: nick.value || userData.nick,
            email: email.value || userData.email,
            SteamId: steamId.value || userData.SteamId,
            PSname: PSname.value || userData.PSname
        };

        try{
            const response = await fetch(`http://localhost:3000/user/updateUser/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: authToken
                },
                body: JSON.stringify(requestBody)
            })
            const resposta = await response.json()
            console.log(resposta)

        }catch(erro){
            console.log("erro "+ erro)
        }
    }

    async function deletarPerfil(){
        const userId = localStorage.getItem("userId")
        try {
            const resultado = await fetch(`http://localhost:3000/user/deleteUser/${userId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                     token: localStorage.getItem("AuthToken")
                },
            })
            const resultadoJson = await resultado.json()
            if (resultadoJson) {
                console.log(resultadoJson);
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    return(
        <div className='divPrincipal'>
             <Navbar page="config"/>
            <h1>Pagina Configurações do Perfil</h1>

            <h2>Seus dados do perfil</h2>
            <Input type="text" placeholder={userData.first_name} name="first_name" id="first_name" />
            <Input type="text" placeholder={userData.last_name} name="last_name" id="last_name" />
            <Input type="text" placeholder={userData.nick} name="nick" id="nick" />
            <Input type="email" placeholder={userData.email} name="email" id="email" />
            {/* <Input type="password" placeholder={userData.senha} name="" id="password" /> */}
            <Input type="number" placeholder={userData.SteamId} name="steam" id="steam"/>
            <Input type="text" placeholder={userData.PSname} name="ps" id="ps"/>
            <Input type="text" placeholder={userData.XboxToken} name="xbox" id="xbox"/>
            <Button value="Atualizar" onclickFunction={atualizarDados}/>
            <Button value="Deletar" onclickFunction={deletarPerfil}/>

            <h2>Suas requisições</h2>
            <GetRequestByUserId />
        </div>
    )
}