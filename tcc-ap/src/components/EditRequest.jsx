import { useState, useEffect } from "react";
import {Input} from './Input.jsx'
import {Button} from './Button.jsx'

export function EditRequest() {

    async function editRequest() {
        const userId = localStorage.getItem("userId")
        const tituloEdit = document.getElementById("titulo")
        const jogoEdit = document.getElementById("jogo")
        const mensagemEdit = document.getElementById("mensagem")
        const qtdPlayersEdit = document.getElementById("qtdPlayers")
        const dataJogarEdit = document.getElementById("dataJogar")

        const requestBody = {
            userId: userId,
            title: tituloEdit.value,
            game: jogoEdit.value,
            message: mensagemEdit.value,
            date: dataJogarEdit.value,
            countPlayers: qtdPlayersEdit.value
        };

        const idRequest = "63eb8efec8d2961f283debb3";

        try {
            const resultado = await fetch(`http://localhost:3000/playerrequest/updatePlayerRequest/${idRequest}`, {
                metohd: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            const resultadoJson = await resultado.json()
            if (resultadoJson) {
                console.log(resultadoJson);
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <br />
            <Input type="text" placeholder="Digite o titulo da requisição" id="tituloEdit"/> 
            <Input type="text" placeholder="Digite o nome do jogo" id="jogoEdit"/>
            <Input type="text" placeholder="Digite a mensagem" id="mensagemEdit"/>
            <label>Informe a quantidade de jogadores:</label> <br />
            <input type="range" id="qtdPlayersEdit" min="0" max="10"/>
            <p>Jogadores: <output id="valueEdit"></output></p>
            <Input type="date" placeholder="Insira a data para jogar" id="dataJogarEdit"/>
            <Button value="Atualizar" onclickFunction={editRequest} />
        </div>
    )
}