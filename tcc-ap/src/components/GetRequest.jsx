import { useState, useEffect } from "react";

export function GetRequest(){

    useEffect(() => {
        const authToken = localStorage.getItem("AuthToken")
        if (authToken) {
            console.log("Vc esta logado")
            getRequest(authToken)
        } else {
            console.log("Realize seu login")
        }
    })

    async function getRequest(authToken){
        try{
            const resultado = await fetch("http://localhost:3000/playerrequest/getPlayerRequest", {
                method: "GET",
                headers: {
                    token: authToken
                }
            })
            const resultadoJson = await resultado.json() 
            if(resultadoJson){
                console.log(resultadoJson);
            }
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            
        </div>
    )
}