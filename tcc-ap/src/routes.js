import React from "react";
import { Routes, Route } from "react-router-dom";

import {Login} from "./pages/login.jsx";
import {Cadastro} from "./pages/cadastro.jsx";
import {Jogadores} from "./pages/jogadores.jsx"
import {Profile} from "./pages/profile.jsx";
import {ProfileConfigurations} from "./pages/profileConfigurations";
import {Entrar} from "./pages/entrar.jsx";
import {Home} from "./pages/home.jsx";

export function Rotas() {

   return(
        <Routes>
                <Route path="/" element={<Home />} />
                <Route path="jogadores" element={<Jogadores />} />
                <Route path="login" element={<Login />} />
                <Route path="cadastro" element={<Cadastro />} />
                <Route path="profile/:nickURL" element={<Profile />} />
                <Route path="profileConfigurations" element={<ProfileConfigurations />} />
                <Route path="entrar" element={<Entrar />} /> 
        </Routes>
   )
}
