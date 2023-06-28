import { useState, useEffect } from "react";
import { Navbar } from '../components/Navbar.jsx'
import'../styles/home.css';

export function Home(){
    useEffect(() => {
        // inicializar com o item-1 selecionado
        // o checked não funciona
        document.getElementById("item-1").checked = true;
    }, []);

    return (
        <div className="divPrincipal">
            <Navbar page="home"/>
            <div className="carousel">
                <div className="containerCarrousel">
                    <input type="radio" className="inputSlide" name="slider" onChange={()=>{}} id="item-1" />
                    <input type="radio" className="inputSlide" name="slider" onChange={()=>{}} id="item-2" />
                    <input type="radio" className="inputSlide" name="slider" onChange={()=>{}} id="item-3" />
                    <div className="slides">
                        <label className="slide" htmlFor="item-1" id="song-1" >
                        <img src= {require('../image/Group 1.png')} alt="slide" />
                        </label>
                        <label className="slide" htmlFor="item-2" id="song-2" >
                        <img src= {require('../image/Group 4 (2).png')} alt="slide" />
                        </label>
                        <label className="slide" htmlFor="item-3" id="song-3" >
                        <img src= {require('../image/Group 3.png')} alt="slide" />
                        </label>
                    </div>
                </div>
            </div>

            <div className="plataformas">
                <div id="divSteam">
                    <img src= {require('../image/iconSteam.png')} alt="steam" heigth="120px" width="140px"/>
                </div> 
                <div id="divXbox">
                    <img src= {require('../image/iconXbox.png')} alt="xbox" heigth="100px" width="120px"/>
                </div>
                <div id="divPS">
                    <img src= {require('../image/iconPS.png')} alt="playstation" heigth="140px" width="160px"/>
                </div>
            </div>
        </div>
    )
}