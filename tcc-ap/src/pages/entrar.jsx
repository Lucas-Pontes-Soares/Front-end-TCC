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
                                    <h1>Bem vindo de volta!</h1>
                                    <p>Para se manter conectado conosco, faça o login com suas informações pessoais</p>
                                    <button className="ghost" id="signIn" onClick={clique2}>Entrar</button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1>Saudações jogador!</h1>
                                    <p>Preencha os seus dados pessoais e comece a viajar connosco</p>
                                    <button className="ghost" id="signUp" onClick={clique1}>Criar</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
    )
}