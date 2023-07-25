import {useState, useEffect } from "react";
import styles from '../styles/perfil.module.css'

export function ProfilePlaystation(props){
    const [psData, setPsData] = useState(null);
    const [psConquistas, setPsConquistas] = useState(null);

    // esse css é apenas para teste, separar em cada perfil em um canto
      
    useEffect(() => {
        const authToken = localStorage.getItem("AuthToken")
        if (authToken) {
            console.log("Vc esta logado")
        } else {
            console.log("Realize seu login")
        }
    
        (async () => {
            //rota para buscar o perfil do jogador
            try {
                const result = await fetch(`http://localhost:3000/ps/findGetUserProfiles/${props.psName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                         token: authToken
                    },
                })
                const resultado = await result.json()
                setPsData(resultado.profile.profile)
            }catch(err){
                console.log("erro " + err)
            }

            //rota para buscar as conquistas
            try {
                const result = await fetch(`http://localhost:3000/ps/findGetUserTitles/${props.psName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                         token: authToken
                    },
                })
                const resultado = await result.json()
                console.log(resultado.games)
                setPsConquistas(resultado.games.trophyTitles)
            }catch(err){
                console.log("erro " + err)
            }
        })();
    }, [props.psName]) //cada vez que o psName mudar, ele renderiza novamente

    return(
        <div>
            {psData ? <div className={styles.userProfile}>
                {psData.avatarUrls[0].avatarUrl ?<img src={psData.avatarUrls[0].avatarUrl} width="50px" alt="Avatar do perfil"/>: <img src={require('../image/no_imageGame.png')} alt="imagem do jogo" width="150px"/> }
                <p>{psData.onlineId}</p>
            </div>: null}

            <p>Quantidade Jogos: {psConquistas?.length}</p>
            {psConquistas ?  psConquistas.map((item) => (
                <div className={styles.games} key={item.npCommunicationId}>
                    <div className={styles.gameInfo}>
                        <p>{item.trophyTitleName}</p>
                        {/* se possuir imagem, exibi-la */}
                        {item.trophyTitleIconUrl ? <img src={item.trophyTitleIconUrl} width="150px" height="100px" alt="imagem do jogo"/> : null}
                    </div>
                    <div className={styles.gameAchivement}>
                        <p>Progresso trofeus: </p>
                        <input type="range" className={styles.qtdPlayers} disabled min="1" value={item.progress}/>
                        <div className={styles.trofeus}>
                            <div className={styles.trofeus1}>
                            Bronze:  {item.earnedTrophies.bronze} de {item.definedTrophies.bronze}
                            </div>
                            <div className={styles.trofeus2}>
                            Prata: {item.earnedTrophies.silver} de {item.definedTrophies.silver}
                            </div>
                            <div className={styles.trofeus3}>
                            Ouro: {item.earnedTrophies.gold} de {item.definedTrophies.gold}
                            </div>
                            <div className={styles.trofeus4}>
                            Platina: {item.earnedTrophies.platinum} de {item.definedTrophies.platinum}
                            </div>
                        </div>
                    </div>
                </div>
            )):null}
        </div>
    )
}