import { useState, useEffect } from "react";

import {Input} from '../components/Input.jsx'
import {Button} from '../components/Button.jsx'

export function ProfileConfigurations(){
    //conferir se o usuario está logado
    useEffect(() => {
        const authToken = localStorage.getItem("AuthToken")
        if (authToken) {
            console.log("Vc esta logado")
        } else {
            console.log("Realize seu login")
        }
    })

    async function atualizarDados(){
        const steamIdDigitado = document.getElementById("steam")
        const PSnameDigitado = document.getElementById("ps")

        const userId = localStorage.getItem("userId")
        const authToken = localStorage.getItem("AuthToken")

        const requestBody = {
            SteamId: steamIdDigitado.value,
             PSname: PSnameDigitado.value
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
    
    return(
        <div>
            <h1>Pagina Configurações do Perfil</h1>
            <Input type="number" placeholder="Digite seu id da Steam" name="ps" id="steam"/>
            <Input type="text" placeholder="Digite seu nome da PS" name="steam" id="ps"/>
            <Button value="Atualizar" onclickFunction={atualizarDados}/>

        </div>
    )
}