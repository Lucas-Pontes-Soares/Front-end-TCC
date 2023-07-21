import { useState, useEffect } from "react";
import styles from '../styles/playerRequest.module.css'
import  { User } from "@phosphor-icons/react";

export function GetRequest(){
    const [playersRequest, setPlayersRequest] = useState([]);

    useEffect(() => {
        const authToken = localStorage.getItem("AuthToken")
        if (authToken) {
            console.log("Vc esta logado")
        } else {
            console.log("Realize seu login")
        }

        (async () => {
            try{
                const authToken = localStorage.getItem("AuthToken")
                const resultado = await fetch("http://localhost:3000/playerrequest/getPlayerRequest", {
                    method: "GET",
                    headers: {
                        token: authToken
                    }
                })
                const resultadoJson = await resultado.json() 
                setPlayersRequest(resultadoJson.busca)
                if(resultadoJson){
                    console.log(resultadoJson);
                }
            }catch(err){
                console.log(err)
            }
        })();
    }, [localStorage.getItem("AuthToken")])

    async function estouinteressado(nickDono, idRequest, playersFound, countPlayers, jogadoresInteressados){
        const nick = localStorage.getItem("nick")

        let jaTem = false;

        for(var i = 0; i < jogadoresInteressados.length; i++){
            if (jogadoresInteressados[i] === nick){
                console.log("já tem")
                jaTem = true;
                break;
            } 
        }
        //verificando: se esta cheio, já o nick ja esta registrado, se for o dono da mensagem
        if (playersFound === countPlayers || jaTem === true || nickDono === nick){
            console.log("Erro!")
        }else {
            //adicionando o novo nick no array
            jogadoresInteressados.push(nick)

            const requestBody = {
                playersFound: playersFound + 1,
                jogadoresInteressados: jogadoresInteressados
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
    }

    return (
        <div>
             {playersRequest ?  playersRequest.map((item) => (
               <div key={item._id} className={styles.playerRequest}>
                <div className={styles.head}>
                    <div className={styles.gameName}>
                        <h1>{item.title}</h1>
                    </div>
                    <div className={styles.createdBy}>
                        <p>{item.nick}</p>
                    </div>
                </div>
                <h2>{item.game}</h2>
                <div className={styles.body}> 
                    <div className={styles.gameInfo}>
                        <p>{item.message}</p>
                        <p>Data marcada: {item.date} às {item.time}</p>
                    </div>
                    <div className={styles.requestInfo}>
                        <p><User size={25} color="#FFFF" weight="fill" /> Quantidade de jogadores: </p>
                        <input type="range" className={styles.qtdPlayers} disabled min="1" max={item.countPlayers} defaultValue={item.playersFound}/>
                        <p>Encontrados {item.playersFound} jogadores de {item.countPlayers}</p>
                        <button className={styles.btnInteressado}onClick={() => estouinteressado(item.nick, item._id, item.playersFound, item.countPlayers, item.jogadoresInteressados)}>Estou interessado</button>
                    </div>
                </div>
               </div>
            )): null}
        </div>
    )
}