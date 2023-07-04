import { useState, useEffect } from "react";
import styles from '../styles/newRequest.module.css'

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

  async function editRequest(idRequest, item) {
    //editar requisição selecionada pelo usuario: idRequest
    const userId = localStorage.getItem("userId")
    const tituloEdit = document.getElementById(idRequest + "titulo").value || item.title;
    const jogoEdit = document.getElementById(idRequest + "jogo").value || item.game;
    const mensagemEdit = document.getElementById(idRequest + "mensagem").value || item.message;
    const qtdPlayersEdit = document.getElementById(idRequest + "qtdPlayers").value || item.countPlayers;
    const dataJogarEdit = document.getElementById(idRequest + "dataJogar").value || item.date;

    const requestBody = {
      userId: userId,
      title: tituloEdit,
      game: jogoEdit,
      message: mensagemEdit,
      date: dataJogarEdit,
      countPlayers: qtdPlayersEdit
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

  async function deleteRequest(idRequest) {
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
  async function mostrarQtdPlayers(idRequest) {
    const valor = document.querySelector("#value")
    const input = document.getElementById(idRequest + "qtdPlayers")
    valor.textContent = input.value
    input.addEventListener("input", (event) => {
      valor.textContent = event.target.value;
    })
  }

  return (
    <div>
      {result.map((item) => (
        <div key={item._id}>
          <div className={styles.playerRequest}>
            <div className={styles.head}>
              <div className={styles.gameName}>
                <h1>Titulo: </h1>
                {/*id dos inputs unicos com id + nome, por exemplo 64a41b5a29837173faee890etitulo */}
                <input type="text" placeholder={item.title} id={item._id + "titulo"} />
              </div>
            </div>
            <div className={styles.body}>
              <h2>Jogo: </h2>
              <br></br>
              <input type="text" placeholder={item.game} id={item._id + "jogo"} />
              <div className={styles.gameInfo}>
                Mensagem:   <input type="text" placeholder={item.message} id={item._id + "mensagem"} />
                Data: <input type="date" placeholder="Insira a data para jogar" id={item._id + "dataJogar"} />
              </div>
              <div className={styles.requestInfo}>
                <label>Informe a quantidade de jogadores:</label>
                <input type="range" onChange={() => mostrarQtdPlayers(item._id)} id={item._id + "qtdPlayers"} className={styles.qtdPlayers} defaultValue={item.countPlayers} min="0" max="10" />
                <p>Jogadores: <output id="value">{item.countPlayers}</output></p>
              </div>
            </div>
                <button value="Atualizar" className={styles.btnEdit} onClick={() => editRequest(item._id, item)}>Atualizar</button>
                <button value="Deletar" className={styles.btnDelete}onClick={() => deleteRequest(item._id, item)}>Deletar</button>
          </div>
        </div>
      ))}
    </div>
  )
}