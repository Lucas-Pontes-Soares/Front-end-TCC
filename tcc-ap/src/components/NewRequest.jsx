import {Input} from './Input.jsx'
import {Button} from './Button.jsx'
import { useState, useEffect } from "react";

export function NewRequest(){
    useEffect(() => {
        const authToken = localStorage.getItem("AuthToken")
        if (authToken) {
            console.log("Vc esta logado")
        } else {
            console.log("Realize seu login")
        }

        const valor = document.querySelector("#value")
        const input = document.querySelector("#qtdPlayers")
        valor.textContent = input.value
        input.addEventListener("input", (event) => {
            valor.textContent = event.target.value;
        })
    })

    async function criarRequesicao(){
        const userId = localStorage.getItem("userId")
        const titulo = document.getElementById("titulo")
        const jogo = document.getElementById("jogo")
        const mensagem = document.getElementById("mensagem")
        const qtdPlayers = document.getElementById("qtdPlayers")
        const dataJogar = document.getElementById("dataJogar")
    
        const requestBody = {
          userId: userId,
          title: titulo.value,
          game: jogo.value,
          message: mensagem.value,
          date: dataJogar.value,
          countPlayers: qtdPlayers.value,
          playersFound: 0,
          concluded: false
        };

        try{
            const resultado = await fetch("http://localhost:3000/playerrequest/createPlayerRequest", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  token: localStorage.getItem("AuthToken")
                },
                body: JSON.stringify(requestBody)
            })
            const resultadoJson = await resultado.json() 
            if(resultadoJson){
                console.log(resultadoJson);
            }
        } catch(err){
            console.log(err)
        }

    }

    return (
        <div>
            <br />
            <Input type="text" placeholder="Digite o titulo da requisição" id="titulo"/> 
            <Input type="text" placeholder="Digite o nome do jogo" id="jogo"/>
            <Input type="text" placeholder="Digite a mensagem" id="mensagem"/>
            <label>Informe a quantidade de jogadores:</label> <br />
            <input type="range" id="qtdPlayers" min="0" max="10"/>
            <p>Jogadores: <output id="value"></output></p>
            <Input type="date" placeholder="Insira a data para jogar" id="dataJogar"/>
            <Button value="Criar" onclickFunction={criarRequesicao} />
        </div>
    )
}