import { useState, useEffect } from "react";
export function Profile(){
    //conferir se o usuario está logado

    useEffect(() => {
        const authToken = localStorage.getItem("AuthToken")
        if (authToken) {
            console.log("Vc esta logado")

        } else {
            console.log("Realize seu login")
        }
    })

    async function buscarDadosUsuario(authToken, userId){
        try{
            const result = await fetch(`http://localhost:3000/user/getUser/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                     token: authToken
                },
            })
                const resultado = await result.json()
                return resultado
        }catch(err){
            console.log("erro " + err)
        }
        
    }

    async function buscarPerfilSteam(authToken, steamId){
        try {
            const result = await fetch(`http://localhost:3000/steam/findGetPlayerSummaries/UserId/${steamId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                     token: authToken
                },
            })
            const resultado = await result.json()
            return resultado
        }catch(err){
            console.log("erro " + err)
        }
    }

    async function buscarPerfil() {
        const authToken = localStorage.getItem("AuthToken")
        const userId = localStorage.getItem("userId")

        //buscar dados perfil
        const dadosUsuario = await buscarDadosUsuario(authToken, userId)
        console.log(dadosUsuario)

        //buscar dados perfil da steam
        const steamId = dadosUsuario.perfil.SteamId
        const data = await buscarPerfilSteam(authToken, steamId)
        console.log(data)
    }

    
    return(
        <div>
            <h1>Profile</h1>
            <button onClick={buscarPerfil}>Buscar Dados</button>
            <h2>Suas Requisições: </h2>
        </div>
    )
}