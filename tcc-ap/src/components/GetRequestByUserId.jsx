import { useState, useEffect } from "react";
import {Input} from './Input.jsx'

export function GetRequestByUserId() {

    const [result, setResult] = useState([]);

    useEffect(() => {
        const authToken = localStorage.getItem("AuthToken")
        if (authToken) {
            console.log("Vc esta logado")
        } else {
            console.log("Realize seu login")
        }

        (async () => {
            //buscar as requisições do usuario logado
          try {
            const userId = localStorage.getItem('userId');
    
            const resultado = await fetch(
              `http://localhost:3000/playerrequest/getPlayerRequestById/${userId}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                   token: authToken
                },
              }
            );
            const resultadoJson = await resultado.json();
            if (resultadoJson) {
              setResult(resultadoJson.Requisição);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      }, []);

      
      async function editRequest(idRequest, item){
        //editar requisição selecionada pelo usuario: idRequest
        const userId = localStorage.getItem("userId") 
        const tituloEdit = document.getElementById("titulo") || item.title;
        const jogoEdit = document.getElementById("jogo") || item.game;
        const mensagemEdit = document.getElementById("mensagem") || item.message;
        const qtdPlayersEdit = document.getElementById("qtdPlayers") || item.countPlayers;
        const dataJogarEdit = document.getElementById("dataJogar") || item.date;

        const requestBody = {
            userId: userId,
            title: tituloEdit.value,
            game: jogoEdit.value,
            message: mensagemEdit.value,
            date: dataJogarEdit.value,
            countPlayers: qtdPlayersEdit.value
        };

        try {
            const resultado = await fetch(`http://localhost:3000/playerrequest/updatePlayerRequest/${idRequest}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                     token: localStorage.getItem("AuthToken")
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

      async function deleteRequest(idRequest){
        //excluir requisição selecionada pelo usuario: idRequest
        try {
            const resultado = await fetch(`http://localhost:3000/playerrequest/deletePlayerRequest/${idRequest}`, {
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

      //alterar a exibição da quantidade de jogadores
      async function mostrarQtdPlayers(){
        const valor = document.querySelector("#value")
        const input = document.querySelector("#qtdPlayers")
        valor.textContent = input.value
        input.addEventListener("input", (event) => {
            valor.textContent = event.target.value;
        })
      }

    return (
        <div>
            {result.map((item) => (
                <div key={item._id}>
                    <p>Próximo</p>
                    <input type="text" placeholder={item.title} id="titulo"/>
                    <input type="text" placeholder={item.game} id="jogo"/>
                    <input type="text" placeholder={item.message} id="mensagem"/>
                    <label>Informe a quantidade de jogadores:</label> <br />
                    <input type="range" onChange={mostrarQtdPlayers} id="qtdPlayers" min="0" max="10"/>
                    <p>Jogadores: <output id="value"></output></p>
                    <input type="date" placeholder="Insira a data para jogar" id="dataJogar"/>
                    <button value="Atualizar" onClick={() => editRequest(item._id, item)}>Atualizar</button>
                    <button value="Deletar" onClick={() => deleteRequest(item._id, item)}>Deletar</button>
                </div>
            ))}
        </div>
    )
}