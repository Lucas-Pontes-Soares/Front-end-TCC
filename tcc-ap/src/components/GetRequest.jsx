import { useState, useEffect } from "react";
import styles from '../styles/playerRequest.module.css'

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


    return (
        <div>
             {playersRequest ?  playersRequest.map((item) => (
               <div key={item._id} className={styles.playerRequest}>
                <div className={styles.head}>
                    <div className={styles.gameName}>
                        <h1>{item.title}</h1>
                    </div>
                    <div className={styles.createdBy}>
                        <p>{item.userId}</p>
                    </div>
                </div>
                <div className={styles.body}> 
                    <h2>{item.game}</h2>
                    <div className={styles.gameInfo}>
                        <p>{item.message}</p>
                        <p>{item.date}</p>
                    </div>
                    <div className={styles.requestInfo}>
                        <input type="range" className={styles.qtdPlayers} disabled min="1" max={item.countPlayers} defaultValue={item.playersFound}/>
                        <p>Encontrados {item.playersFound} jogadores de {item.countPlayers}</p>
                    </div>
                </div>
               </div>
            )): null}
        </div>
    )
}