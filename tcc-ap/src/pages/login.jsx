import { useState, useEffect } from "react";
import {Input} from '../components/Input.jsx'
import { Alert } from "../components/Alert.jsx";
import { MD5 } from 'crypto-js';

export function Login(){
  const [response, setResponse] = useState(null);

    async function fazerLogin() {
        const emailDigitado = document.getElementById("loginEmail")
        const senhaDigitada = document.getElementById("loginPassword")
        const senhaCriptografada = MD5(senhaDigitada).toString();

        const requestBody = {
            email: emailDigitado.value,
            password: senhaCriptografada
        };
      
        try{
            const LoginResponse = await fetch(`${process.env.REACT_APP_URLBackend}/user/loginuser`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestBody)
            })
            const LoginJson = await LoginResponse.json()
            console.log(LoginJson)

            if(LoginJson.success === true){
              console.log("entrou")
              localStorage.setItem("AuthToken", LoginJson.token)
              localStorage.setItem("userId", LoginJson.user._id)
              localStorage.setItem("nick", LoginJson.user.nick)
              window.location.href = `${process.env.REACT_APP_URLFrontend}`;
              setResponse(LoginJson)
            }else {
              console.log("email ou senha incorretos")
              setResponse(LoginJson)
            }

        }catch(erro){
          console.log("erro " + erro)
        }
      };

    return(
        <div className="form-container sign-in-container">
          {response ? <Alert type={response.type} message={response.message}/> : null}
          <div className="formulario">
              <h1>Entre na sua conta</h1>
              <span>ou crie uma conta</span>
              <Input type="email" placeholder="Digite seu email" name="email" id="loginEmail"/>
              <Input type="password" placeholder="Digite sua senha" name="password" id="loginPassword"/>
              <button id="signIn" onClick={fazerLogin}>Entrar</button>
          </div>
        </div>
    )
}
