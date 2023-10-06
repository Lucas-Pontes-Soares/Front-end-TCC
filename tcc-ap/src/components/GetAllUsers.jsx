import { useState, useEffect } from "react";
import styles from '../styles/getUserProfile.module.css'
import  { ArrowSquareOut  } from "@phosphor-icons/react";

export function GetAllUsers(){
    const [allUsers, setAllusers] = useState([]);

    useEffect(() => {
        const authToken = localStorage.getItem("AuthToken")
        console.log("chamou")
        if (authToken) {
            console.log("Vc esta logado")
        } else {
            console.log("Realize seu login")
        }    
    }, [localStorage.getItem("AuthToken")])

    async function buscaNick(){
        const nickDigitado = document.getElementById("buscaNick").value;

        try{
            const authToken = localStorage.getItem("AuthToken")
            const resultado = await fetch(`${process.env.REACT_APP_URLBackend}/user/getAllUsers/${nickDigitado}`, {
                method: "GET",
                headers: {
                    token: authToken
                }
            })
            const resultadoJson = await resultado.json()
            if(resultadoJson){
                setAllusers(resultadoJson)
                console.log(resultadoJson)
            }
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <p>Procure jogadores pelo seu nick: </p>
            <input type="text" id="buscaNick" onChange={buscaNick} placeholder="Busque jogadores pelo nick"/>
            {allUsers.type !== "Perigo" ? <p>Jogadores encontrados: </p>: null}
             {allUsers.users?.map((userData) => (
            <div className={styles.user} key={userData._id}>
                <div className={styles.divFoto}>
                    <img src={userData.image} className={styles.foto} alt="fotoPerfil" heigth="70px" width="90px"/> 
                </div>
                <div className={styles.head}>
                <div className={styles.nick}>
                    <h3>{userData.nick}</h3>
                </div>
                    <div className={styles.link}>
                        <a href={"http://localhost:3006/profile/" + userData.nick}>Visitar o perfil <ArrowSquareOut size={20}/></a>
                    </div>
                </div>
                <div className={styles.data}>
                    <p>Nome: {userData.first_name}</p>
                    <p>Sobrenome: {userData.last_name}</p>
                </div>
            </div>
            ))}
        </div>
    )
}