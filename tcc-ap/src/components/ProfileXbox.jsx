import {useState, useEffect } from "react";

export function ProfileXbox(props){
    const [xboxData, setXboxData] = useState(null);
    const [xboxConquistas, setXboxConquistas] = useState(null);

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
                const result = await fetch(`http://localhost:3000/xbox/findGetUserProfile/${props.loginId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                         token: authToken
                    },
                })
                const resultado = await result.json()
                setXboxData(resultado.profile.profileUsers[0])
            }catch(err){
                console.log("erro " + err)
            }

            //função para consultar a api de buscar as conquistas
            async function buscarConquistas(arrayJogos, limite){
                const result = await fetch(`http://localhost:3000/xbox/findGetUserAchievements/${props.loginId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                         limit: limite
                    },
                })
                const resultado = await result.json()
                arrayJogos = arrayJogos.concat(resultado.message)
                //console.log(resultado.message.length)
                /*
                    confere o length, se tiver buscado mais jogos
                    chama a function novamente pra buscar mais 32
                    se não, ele set o estado e para
                    (limite max = 32)
                */
                if(resultado.message.length >= 1){
                    limite = limite + 32;
                    buscarConquistas(arrayJogos, limite)
                }if(resultado.message.length == 0){
                    setXboxConquistas(arrayJogos)
                }
            }

            //rota para buscar as conquistas
            try {
                let limite = 0;

                const result = await fetch(`http://localhost:3000/xbox/findGetUserAchievements/${props.loginId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                         limit: limite
                    },
                })

                const resultado = await result.json()
                /*
                    confere o length, se tiver buscado mais jogos
                    chama a function novamente pra buscar mais 32
                    (limite max = 32)
                */
                if(resultado.message.length >= 1){
                    limite = limite + 32;
                    await buscarConquistas(resultado.message, limite)
                }
            }catch(err){
                console.log("erro " + err)
            }
        })();
    }, [props.loginId]) //cada vez que o loginId mudar, ele renderiza novamente

    return(
        <div>
            <p>Dados Xbox</p>
            {xboxData ? <div>
                <p>Dados Playstation: </p>
                <p>{xboxData.settings[0].value}</p>
            </div>: null}

            <p>Conquistas:</p>
            {/* ----- AVISO IMAGENS -----*/}
            {/* SE AS IMAGENS NÃO CARREGAREM, É PQ A API DO XBOX PASSOU O NÚMERO DE REQUISIÇÕES MAXIMAS*/}
            {/* FUTURAMENTE, ADICIONAR NAS IMAGENS NÃO CARREGADAS, COLOCANDO BOTÃO PARA ATUALIZAR SOMENTE A IMAGEM*/}
                {xboxConquistas ?  xboxConquistas.map((item) => (
                    <div key={item.titleId}>
                        <p>{item.name}</p>
                        {item.image ? <img src={item.image} alt="imagem do jogo" width="200px" height="150px"/> : null}
                        <p>Pontos máximos:{item.maxGamerscore}</p>
                        <p>Pontos atingidos: {item.currentGamerscore}, Conquistas: {item.earnedAchievements}</p>
                    </div>
                )):null}
            <br />
        </div>
    )
}