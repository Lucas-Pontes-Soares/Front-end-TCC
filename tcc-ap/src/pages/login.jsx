import { useState, useEffect } from "react";
import {Input} from '../components/Input.jsx'
import {Button} from '../components/Button.jsx'


export function Login(){

    async function fazerLogin () {
        const emailDigitado = document.getElementById("email")
        const senhaDigitada = document.getElementById("password")

        const requestBody = {
            email: emailDigitado.value,
            password: senhaDigitada.value
        };
      
        try{
            const LoginResponse = await fetch('http://localhost:3000/user/loginuser', {
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
            }else {
              console.log("email ou senha incorretos")
            }

        }catch(erro){
          console.log("erro " + erro)
        }
      };

    return(
        <div className='login'>
            <h1>Pagina Login</h1>
            <Input type="email" placeholder="Digite seu email" name="email" id="email"/>
            <Input type="password" placeholder="Digite sua senha" name="password" id="password"/>
            <Button value="Entrar" onclickFunction={fazerLogin}/>
        </div>
    )
}
