import {useState, useEffect } from "react";

export function ProfileSteam(props){
    const [steamData, setSteamData] = useState([]);
    const [steamConquistas, setSteamConquistas] = useState([]);

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
        <div>
            <p>Dados Steam:</p>
            <img src={steamData.avatar} alt="avatar do usuário" />
            <p>{steamData.personaname}</p>
            <p>Conquistas</p>
            {/* percorrendo os arrays dos jogos */}
            {/* condição ? verdadeiro : falso*/}
            {steamConquistas ?  steamConquistas.map((item) => (
               <div key={item.gameInfo.appid}>
                    <p>{item.gameInfo.title}</p>
                    {/* se possuir imagem, exibi-la */}
                    {item.gameInfo.image ? <img src={item.gameInfo.image} alt="imagem do jogo"/> : null}
                    {/* exibir as conquistas, quantidade (length) e o filter para ver quantas bloqueadas ou n */}
                    {item.gameAchivement.achivement ? 
                    <div>
                        <p>Número de conquistas:{item.gameAchivement.achivement?.length}</p>
                        <p>Desbloqueadas: {item.gameAchivement.achivement?.filter((item) => item.achieved === 1).length}</p>
                        <p>Bloqueadas: {item.gameAchivement.achivement?.filter((item) => item.achieved === 0).length}</p>
                    </div>
                    : <p>Este jogo não possui conquistas</p>}
               </div>
            )): null}
           
        </div>
    )
}