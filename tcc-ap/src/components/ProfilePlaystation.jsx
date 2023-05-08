import {useState, useEffect } from "react";

export function ProfilePlaystation(props){
    const [psData, setPsData] = useState(null);
    const [psConquistas, setPsConquistas] = useState(null);

    // esse css é apenas para teste, separar em cada perfil em um canto
    const estilo = {
        float: "right",
    };
      
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
        <div style={estilo}>
            {psData ? <div>
            <p>Dados Playstation: </p>
            {psData.avatarUrls[0].avatarUrl ?<img src={psData.avatarUrls[0].avatarUrl} alt="Avatar do perfil"/>: null }
            <p>{psData.onlineId}</p>
            </div>: null}

            <p>Conquistas</p>
            {psConquistas ?  psConquistas.map((item) => (
                <div key={item.npCommunicationId}>
                   <p>{item.trophyTitleName}</p>
                    {/* se possuir imagem, exibi-la */}
                    {item.trophyTitleIconUrl ? <img src={item.trophyTitleIconUrl} alt="imagem do jogo"/> : null}
                    <p>Conquistas disponiveis: </p>
                    <p>
                        Bronze: {item.definedTrophies.bronze} , 
                        Prata: {item.definedTrophies.silver} ,
                        Ouro: {item.definedTrophies.gold} ,
                        Platina: {item.definedTrophies.platinum} 
                    </p>

                    <p>Progesso: {item.progress} %</p>

                    <p>Conquistas desbloqueadas: </p>
                    <p>
                        Bronze: {item.earnedTrophies.bronze} ,
                        Prata: {item.earnedTrophies.silver} ,
                        Ouro: {item.earnedTrophies.gold} ,
                        Platina: {item.earnedTrophies.platinum} 
                    </p>
                    <br />
                </div>
            )):null}
        </div>
    )
}