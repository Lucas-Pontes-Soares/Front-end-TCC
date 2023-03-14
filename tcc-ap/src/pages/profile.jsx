import { useState, useEffect } from "react";

export function Profile(){
    const [data, setData] = useState({});

    //conferir se o usuario está logado
    useEffect(() => {
        const authToken = localStorage.getItem("AuthToken")
        if (authToken) {
            console.log("Vc esta logado")
        } else {
            console.log("Realize seu login")
        }
    })

    function buscarPerfil() {
        const authToken = localStorage.getItem("AuthToken")

        const requestBody = {
            token: authToken
        };
    
        fetch(`http://localhost:3000/steam/findGetPlayerSummaries/UserId/:76561198373878594`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
        
        console.log(data)

    }
    return(
        <div>
            <h1>Profile</h1>
            <button onClick={buscarPerfil}>Buscar Dados</button>
        </div>
    )
}