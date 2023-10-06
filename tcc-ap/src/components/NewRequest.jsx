import {Input} from './Input.jsx'
import { useState, useEffect } from "react";
import { Alert } from "../components/Alert.jsx";
import styles from '../styles/newRequest.module.css'

export function NewRequest(){
    const [userNick, setUserNick] = useState([]);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const authToken = localStorage.getItem("AuthToken")
        if (authToken) {
            console.log("Vc esta logado")
        } else {
            console.log("Realize seu login")
        }

        (async () => {
            //rota para buscar o nome do usuario logado
            try{
              const userId = localStorage.getItem("userId")
              const result = await fetch(`${process.env.URL-Backend}/user/getUser/${userId}`, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      token: localStorage.getItem("AuthToken")
                  },
              })
              const profile = await result.json();
              setUserNick(profile.perfil.nick);
          }catch(err){
              console.log("erro " + err)
          }
          })();
    }, [localStorage.getItem("userId")])

    useEffect(() => {
        const valor = document.querySelector("#value")
        const input = document.querySelector("#qtdPlayers")
        valor.textContent = input.value
        input.addEventListener("input", (event) => {
            valor.textContent = event.target.value;
        })
    })

    async function criarRequesicao(){
        const userId = localStorage.getItem("userId")

        const nick = userNick;
        const titulo = document.getElementById("titulo")
        const jogo = document.getElementById("jogo")
        const mensagem = document.getElementById("mensagem")
        const qtdPlayers = document.getElementById("qtdPlayers")
        const dataJogar = document.getElementById("dataJogar")

        const datetimeObject = new Date(dataJogar.value);
        const currentDate = new Date();

        // verificação dataatual e data digitada
        if(datetimeObject > currentDate){
            const tempoFormatado = datetimeObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const dia = datetimeObject.getDate();
            const mes = datetimeObject.getMonth() + 1;
            const ano = datetimeObject.getFullYear();
            const dataFormatada = `${dia}/${mes}/${ano}`;

            const requestBody = {
                userId: userId,
                nick: nick,
                title: titulo.value,
                game: jogo.value,
                message: mensagem.value,
                datetimeObject: datetimeObject,
                date: dataFormatada,
                time: tempoFormatado,
                countPlayers: qtdPlayers.value,
                playersFound: 0,
                concluded: false
              };
      
              try{
                  const resultado = await fetch(`${process.env.URL-Backend}/playerrequest/createPlayerRequest`, {
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
        } else {
            setResponse("Data invalida!")
            console.log("data invalida")
        }
    }

    return (
        <div>
            {response ? <Alert type="Erro" message={response}/> : null}
             <div className={styles.playerRequest}>
                <div className={styles.head}>
                    <div className={styles.gameName}>
                        <h1>Titulo: </h1>
                        <Input type="text" placeholder="Digite o titulo da requisição" id="titulo"/> 
                    </div>
                </div>
                <h2>Jogo: </h2>
                <Input type="text" placeholder="Digite o nome do jogo" id="jogo"/>
                <div className={styles.body}> 
                    <div className={styles.gameInfo}>
                        Mensagem: <Input type="text" placeholder="Digite a mensagem" id="mensagem"/>
                        Data <Input type="datetime-local" placeholder="Insira a data para jogar" id="dataJogar"/>
                    </div>
                    <div className={styles.requestInfo}>
                        <label>Informe a quantidade de jogadores:</label> <br />
                        <input type="range" className={styles.qtdPlayers} id="qtdPlayers" min="1" max="10"/>
                        <p>Jogadores: <output id="value"></output></p>
                        <button value="Criar" className={styles.btnCriar} onClick={criarRequesicao}>Criar</button>
                    </div>
                </div>
               </div>
            <br />
        </div>
    )
}