import { useState, useEffect } from "react";
import { Input } from '../components/Input.jsx'


export function Cadastro() {

  async function fazerCadasro() {
    const firstname = document.getElementById("first-name")
    const lastname = document.getElementById("last-name")
    const nickDigitado = document.getElementById("nick")
    const emailDigitado = document.getElementById("email")
    const senhaDigitada = document.getElementById("password")

    const requestBody = {
      first_name: firstname.value,
      last_name: lastname.value,
      email: emailDigitado.value,
      nick: nickDigitado.value,
      password: senhaDigitada.value
    };

    try {
      const response = await fetch('http://localhost:3000/user/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      const resposta = await response.json()
      console.log(resposta)

      if (resposta.success === true) {
        console.log("criou")
      } else {
        console.log("conta não criada")
      }
      
    } catch (erro) {
      console.log("erro" + erro)
    }
  }



  return (
    <div className="form-container sign-up-container">
      <div className="formulario">
        <h1>Crie a sua conta</h1>
        <span>ou use o seu email para entrar</span>
        <Input type="text" placeholder="Digite seu primeiro nome" name="first-name" id="first-name" />
        <Input type="text" placeholder="Digite seu ultimo nome" name="last-name" id="last-name" />
        <Input type="text" placeholder="Digite seu nick" name="nick" id="nick" />
        <Input type="email" placeholder="Digite seu email" name="email" id="email" />
        <Input type="password" placeholder="Digite sua senha" name="password" id="password" />
        <button id="signUp" onClick={fazerCadasro}>Criar</button>
      </div>
    </div>
  )
}
