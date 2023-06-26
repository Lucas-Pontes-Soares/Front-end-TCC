import { useState, useEffect } from "react";
import '../styles/entrar.css';
import { Login } from '../pages/login';
import { Cadastro } from '../pages/cadastro';

export function Entrar(){
    const [teste, setTeste] = useState(null);

    useEffect(() => {
        const container = document.getElementById('container');
        setTeste(container)
      }, []);

    function clique1(){
        teste.classList.add("right-panel-active");
        console.log("trocou")
    }

    function clique2(){
        teste.classList.remove("right-panel-active");
        console.log("voltou")
    }

    return (
        <div className="body">
            <div className="container" id="container">
                    <Cadastro />
                    <Login />
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className="ghost" id="signIn" onClick={clique2}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className="ghost" id="signUp" onClick={clique1}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}