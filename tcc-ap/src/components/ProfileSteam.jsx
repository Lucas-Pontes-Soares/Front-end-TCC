import {useState, useEffect } from "react";
import styles from '../styles/perfil.module.css'

export function ProfileSteam(props){
    const [steamData, setSteamData] = useState([]);
    const [steamConquistas, setSteamConquistas] = useState([]);

    // esse css é apenas para teste, separar em cada perfil em um canto
    const estilo = {
        float: "left",
    };

    useEffect(() => {
        const authToken = localStorage.getItem("AuthToken")
        if (authToken) {
            console.log("Vc esta logado")
        } else {
            console.log("Realize seu login")
        }
    
        (async () => {
            //rota para buscar o perfil (sumario) do jogador
            try {
                const result = await fetch(`http://localhost:3000/steam/findGetPlayerSummaries/UserId/${props.steamId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                         token: authToken
                    },
                })
                const resultado = await result.json()
                setSteamData(resultado.Summaries.response.players[0])
            }catch(err){
                console.log("erro " + err)
            }

            //rota para buscar as conquistas
            try {
                const result = await fetch(`http://localhost:3000/steam/findGetPlayerGames/Userid/${props.steamId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                         token: authToken
                    },
                })
                const resultado = await result.json()
                console.log(resultado.games)
                setSteamConquistas(resultado.games)
            }catch(err){
                console.log("erro " + err)
            }
        })();
    }, [props.steamId]) //cada vez que o steamId mudar, ele renderiza novamente

    return(
        <div style={estilo}>
            <div className={styles.userProfile}>
                <img src={steamData.avatar} alt="avatar do usuário" width="50px" />
                <p>{steamData.personaname}</p>
            </div>
            <p>Quantidade Jogos: {steamConquistas.length}</p>
            {/* percorrendo os arrays dos jogos */}
            {/* condição ? verdadeiro : falso*/}
            {steamConquistas ?  steamConquistas.map((item) => (
               <div className={styles.games}key={item.gameInfo.appid}>
                    <div className={styles.gameInfo}>
                        <p>{item.gameInfo.title}</p>
                        {/* se possuir imagem, exibi-la */}
                        {item.gameInfo.image ? <img src={item.gameInfo.image} alt="imagem do jogo" width="150px"/> : null}
                    </div>
                    {/* exibir as conquistas, quantidade (length) e o filter para ver quantas bloqueadas ou n */}
                    {item.gameAchivement.achivement ? 
                    <div className={styles.gameAchivement}>
                        {item.gameAchivement.achivement?.length === item.gameAchivement.achivement?.filter((item) => item.achieved === 1).length ? <p className={styles.platinado}>Jogo Platinado</p> : null}
                        <p>Progesso conquistas: </p>
                        <p>{item.gameAchivement.achivement?.filter((item) => item.achieved === 1).length} de {item.gameAchivement.achivement?.length}</p>
                        {/* <p>Bloqueadas: {item.gameAchivement.achivement?.filter((item) => item.achieved === 0).length}</p> */}
                        <input type="range" className={styles.qtdPlayers} disabled min="1" 
                        max={item.gameAchivement.achivement?.length} 
                        defaultValue= {item.gameAchivement.achivement?.filter((item) => item.achieved === 1).length}/>
                    </div>
                    : <p>Este jogo não possui conquistas</p>}
                    <br />
               </div>
            )): null}
           
        </div>
    )
}