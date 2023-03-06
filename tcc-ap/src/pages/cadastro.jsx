import { useState, useEffect } from "react";

import {Input} from '../components/Input.jsx'
import {Button} from '../components/Button.jsx'

export function Cadastro(){
    const [data, setData] = useState({});

    const fazerCadasro = () => {
        const firstname = document.getElementById("first-name")
        const lastname = document.getElementById("last-name")
        const emailDigitado = document.getElementById("email")
        const senhaDigitada = document.getElementById("password")

        const requestBody = {
            first_name: firstname.value,
            last_name: lastname.value,
            email: emailDigitado.value,
            password: senhaDigitada.value
        };
      
        fetch('http://localhost:3000/user/createuser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
      };

      useEffect(() => {
        if(data.success === true){
          console.log("criou")
        }else {
          console.log("burro")
        }
      })

    return(
        <div className='login'>
            <h1>Pagina de Cadastro</h1>
            <Input type="text" placeholder="Digite seu primeiro nome" name="first-name" id="first-name"/>
            <Input type="text" placeholder="Digite seu ultimo nome" name="last-name" id="last-name"/>
            <Input type="email" placeholder="Digite seu email" name="email" id="email"/>
            <Input type="password" placeholder="Digite sua senha" name="password" id="password"/>
            <Button value="Entrar" onclickFunction={fazerCadasro}/>

            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    )
}
