import { useState, useEffect } from "react";
import {Input} from '../components/Input.jsx'
import {Button} from '../components/Button.jsx'


export function Login(){
    const [data, setData] = useState({});

    const fazerLogin = () => {
        const emailDigitado = document.getElementById("email")
        const senhaDigitada = document.getElementById("password")

        const requestBody = {
            email: emailDigitado.value,
            password: senhaDigitada.value
        };
      
        fetch('http://localhost:3000/user/loginuser', {
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
          console.log("entrou")
          console.log(data.token)
          localStorage.setItem("AuthToken", data.token)
        }else {
          console.log("email ou senha incorretos")
        }
      })

    return(
        <div className='login'>
            <h1>Pagina Login</h1>
            <Input type="email" placeholder="Digite seu email" name="email" id="email"/>
            <Input type="password" placeholder="Digite sua senha" name="password" id="password"/>
            <Button value="Entrar" onclickFunction={fazerLogin}/>

            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    )
}
