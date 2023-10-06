import { useState, useEffect } from "react";
import styles from '../styles/perfil.module.css'

export function ProfileSteam(props) {
    const [steamData, setSteamData] = useState([]);
    const [steamConquistas, setSteamConquistas] = useState([]);
    const [nextPage, setNextPage] = useState([]);

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
                const result = await fetch(`${process.env.URL-Backend}/steam/findGetPlayerSummaries/UserId/${props.steamId}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: authToken
                    },
                })
                const resultado = await result.json()
                setSteamData(resultado.Summaries.response.players[0])
            } catch (err) {
                console.log("erro " + err)
            }

            //rota para buscar as conquistas
            try {
                const page = 1;
                const result = await fetch(`${process.env.URL-Backend}/steam/findGetPlayerGames/Userid/${props.steamId}/${page}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: authToken
                    },
                })
                const resultado = await result.json()
                console.log(resultado.games)
                setSteamConquistas(prevConquistas => [...prevConquistas, ...resultado.games]);
                setNextPage(resultado.nextPage);
            } catch (err) {
                console.log("erro " + err)
            }
        })();
    }, [props.steamId]) //cada vez que o steamId mudar, ele renderiza novamente

    async function buscarConquistasSteam(nextPage) {
        const authToken = localStorage.getItem("AuthToken");
      
        try {
          const result = await fetch(`${process.env.URL-Backend}/steam/findGetPlayerGames/Userid/${props.steamId}/${nextPage}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              token: authToken
            },
          });
          const resultado = await result.json();
          console.log(resultado.games)
          setSteamConquistas(prevConquistas => [...prevConquistas, ...resultado.games]);
          setNextPage(resultado.nextPage);
        } catch (err) {
          console.log("erro " + err);
        }
      }

    return (
        <div>
            <div className={styles.userProfile}>
                <img src={steamData.avatar} alt="avatar do usuário" width="50px" />
                <p>{steamData.personaname}</p>
            </div>
            <p>Quantidade Jogos: {steamConquistas.length}</p>
            {/* percorrendo os arrays dos jogos */}
            {/* condição ? verdadeiro : falso*/}
            {steamConquistas ? steamConquistas.map((item) => (
                <div className={styles.games} key={item.gameInfo.appid}>
                    <div className={styles.gameInfo}>
                        {item.gameInfo ? (
                            item.gameInfo.title === "nada" ? (
                                <p>Indefinido</p>
                            ) : (
                                <p>{item.gameInfo.title}</p>
                            )
                        ) : (
                            <p>Indefinido</p>
                        )}

                        {item.gameInfo ? (
                            item.gameInfo.image === "nada" ? (
                                <img src={require('../image/no_imageGame.png')} alt="imagem do jogo" width="150px" />
                            ) : (
                                <p><img src={item.gameInfo.image} alt="imagem do jogo" width="150px" /></p>
                            )
                        ) : (
                            <img src={require('../image/no_imageGame.png')} alt="imagem do jogo" width="150px" />
                        )}

                    </div>
                    {/* exibir as conquistas, quantidade (length) e o filter para ver quantas bloqueadas ou n */}
                    {item.gameAchivement ? (
                        <div>
                            {item.gameAchivement.achivement ?
                                <div className={styles.gameAchivement}>
                                    {item.gameAchivement.achivement === "Limite de requisições alcançado" ? <p>"Limite de requisições alcançado"</p> :
                                        item.gameAchivement.achivement?.length === item.gameAchivement.achivement?.filter((item) => item.achieved === 1).length ? <p className={styles.platinado}>Jogo Platinado</p> : null}

                                    <p>Progesso conquistas: </p>
                                    {item.gameAchivement.achivement === "Limite de requisições alcançado" ? <p></p> :
                                        <p>{item.gameAchivement.achivement?.filter((item) => item.achieved === 1).length} de {item.gameAchivement.achivement?.length}</p>}

                                    {/* <p>Bloqueadas: {item.gameAchivement.achivement?.filter((item) => item.achieved === 0).length}</p> */}

                                    {item.gameAchivement.achivement === "Limite de requisições alcançado" ? <p></p> :
                                        <input
                                            type="range"
                                            className={styles.qtdPlayers}
                                            disabled
                                            min="1"
                                            max={item.gameAchivement.achivement?.length}
                                            defaultValue={item.gameAchivement.achivement?.filter((item) => item.achieved === 1).length} />}
                                </div>
                                : <div className={styles.gameAchivement}>
                                    <p>Este jogo não possui conquistas</p>
                                </div>
                            }
                        </div>
                    ) : <div className={styles.gameAchivement}>
                        <p>Este jogo não possui conquistas</p>
                    </div>}

                    <br />
                </div>
            )) : null}
            <button 
            onClick={() => buscarConquistasSteam(nextPage)}
            className={styles.btnVerMais}
            >Carregar mais
            </button>
        </div>
    )
}