import { useState, useEffect } from "react";

export function GetRequest(){
    async function getRequest(){
        try{
            const resultado = await fetch("http://localhost:3000/playerrequest/getPlayerRequest", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
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

    useEffect(() => {
        getRequest()
    })

    return (
        <div>
            
        </div>
    )
}