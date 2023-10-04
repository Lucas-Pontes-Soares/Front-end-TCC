import { useState, useEffect } from "react";

import {Input} from '../components/Input.jsx'
import { GetRequestByUserId } from '../components/GetRequestByUserId.jsx';
import { NavbarResponsive } from '../components/NavbarResponsive.jsx'
import styles from '../styles/profileConfig.module.css'
import { Logout } from '../components/Logout.jsx';
import { Alert } from "../components/Alert.jsx";
import { UploadImage } from "../components/uploadImage.jsx";

export function ProfileConfigurations(){
    const [userData, setUserData] = useState([]);
    const [mostrarComponente, setMostrarComponente] = useState(false);
    const [response, setResponse] = useState(null);
    const [responseXbox, setResponseXbox] = useState(null);

    //conferir se o usuario está logado
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        const authToken = localStorage.getItem("AuthToken")

        if (authToken) {
            console.log("Vc esta logado");
            
            (async () => {
                //buscar dados do usuario
                try{
                    const result = await fetch(`http://localhost:3000/user/getUser/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            token: authToken
                        },
                    })
                    const resultado = await result.json()
                    setUserData(resultado.perfil);
                    
                }catch(err){
                    console.log("erro " + err)
                }
            })();
        } else {
            console.log("Realize seu login")
        }
    }, [])

    async function atualizarDados(){
        const first_name = document.getElementById("first_name");
        const last_name = document.getElementById("last_name")
        const nick = document.getElementById("nick")
        const email = document.getElementById("email")
        const steamId = document.getElementById("steam")
        const PSname = document.getElementById("ps")
        const xbox = document.getElementById("xbox")

        const userId = localStorage.getItem("userId")
        const authToken = localStorage.getItem("AuthToken")
        let requestBody = [];

        //caso não tenha sincronizado o xbox
        if(xbox.value !== ""){
            requestBody = {
                first_name: first_name.value || userData.first_name,
                last_name: last_name.value || userData.last_name,
                nick: nick.value || userData.nick,
                email: email.value || userData.email,
                SteamId: steamId.value || userData.SteamId,
                PSname: PSname.value || userData.PSname,
                XboxToken: userId
            };
        } else {
            requestBody = {
                first_name: first_name.value || userData.first_name,
                last_name: last_name.value || userData.last_name,
                nick: nick.value || userData.nick,
                email: email.value || userData.email,
                SteamId: steamId.value || userData.SteamId,
                PSname: PSname.value || userData.PSname,
            };
        }


        try{
            const response = await fetch(`http://localhost:3000/user/updateUser/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: authToken
                },
                body: JSON.stringify(requestBody)
            })
            const resposta = await response.json()
            console.log(resposta)
            setResponse(resposta)
            localStorage.setItem("nick", nick.value)
        }catch(erro){
            console.log("erro "+ erro)
        }
    }

    async function deletarPerfil(){
        const userId = localStorage.getItem("userId")
        try {
            const resultado = await fetch(`http://localhost:3000/user/deleteUser/${userId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                     token: localStorage.getItem("AuthToken")
                },
            })
            const resultadoJson = await resultado.json()
            if (resultadoJson) {
                console.log(resultadoJson);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const toggleComponente = () => {
        setMostrarComponente(!mostrarComponente);
      };

    async function authUpdate(){
        try{
            const response = await fetch(`http://localhost:3000/xbox/authUpdate/${localStorage.getItem("userId")}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const resposta = await response.json()
            console.log(resposta)
            setResponseXbox(resposta)
            atualizarDados()
        }catch(erro){
            console.log("erro "+ erro)
        }
    }
    
    return(
        <div className='divPrincipal'>
             <NavbarResponsive page="config"/>
             {response ? <Alert type={response.type} message={response.message}/> : null}
            <div className={styles.dadosPerfil}>
                <div className={styles.barraPerfil}>
                    <div className={styles.seuPerfil}>
                        <h3>Seu perfil:</h3>
                    </div>
                    <div className={styles.logout}>
                        <Logout />
                    </div>
                </div>
                <div className={styles.perfil}>
                    <div className={styles.divFoto}>
                        <img src={userData.image} className={styles.foto} alt="imagem" heigth="220px" width="240px"/> 
                        < UploadImage />
                    </div>
                    <div className={styles.divDados}>
                        Seu primeiro nome<Input className={styles.inputEntrada} type="text" placeholder={userData.first_name} name="first_name" id="first_name" />
                        Seu ultimo nome<Input className={styles.inputEntrada} type="text" placeholder={userData.last_name} name="last_name" id="last_name" />
                        Seu nick<Input className={styles.inputEntrada} type="text" placeholder={userData.nick} name="nick" id="nick" />
                        Seu email<Input className={styles.inputEntrada} type="email" placeholder={userData.email} name="email" id="email" />
                        {/* <Input type="password" placeholder={userData.senha} name="" id="password" /> */}
                    </div>
                </div>
            </div>
            {responseXbox ? <Alert type={responseXbox.type} message={responseXbox.message} link={responseXbox.link}/> : null}
            <div className={styles.conexao}>
                <div className={styles.steam}> 
                    <h2>Steam</h2>
                    <img src= {require('../image/steam.png')} alt="steam" heigth="120px" width="140px"/>
                    <p>Id de usuario: </p>
                    <Input className={styles.inputEntrada} type="text" placeholder={userData.SteamId} name="steam" id="steam"/>
                    <button className={styles.btnEdit} onClick={atualizarDados}>Editar</button>
                </div>
                <div className={styles.ps}>
                    <h2>Playstation</h2>
                    <img src= {require('../image/playstation.png')} alt="steam" heigth="120px" width="140px"/> 
                    <p>Nome de usuário: </p>
                    <Input className={styles.inputEntrada} type="text" placeholder={userData.PSname} name="ps" id="ps"/>
                    <button className={styles.btnEdit} onClick={atualizarDados}>Editar</button>
                </div>
                <div className={styles.xbox}>
                    <h2>Xbox</h2> 
                    <img src= {require('../image/xbox.png')} alt="steam" heigth="120px" width="140px"/>
                    <p>Id de usuário: </p>
                    <input className={styles.inputEntrada} type="text" disabled placeholder={userData.XboxToken} name="xbox" id="xbox"/>
                    <button className={styles.btnEdit} onClick={authUpdate}>Editar</button>
                </div>
            </div>
            <div className={styles.central}>
                <button value="Atualizar" className={styles.btnEdit} onClick={atualizarDados}>Atualizar Perfil</button>
                <button value="Deletar" className={styles.btnDelete} onClick={deletarPerfil}>Deletar Perfil</button>

                <h2>Suas requisições</h2>
                <button className={styles.seeRequest} onClick={toggleComponente}>{mostrarComponente ? 'Fechar Requisições' : 'Visualizar Requisições'}</button>
            </div>
            {mostrarComponente && <GetRequestByUserId />}
        </div>
    )
}