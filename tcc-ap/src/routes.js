import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Login} from "./pages/login.jsx";
import {Cadastro} from "./pages/cadastro.jsx";
import {Home} from "./pages/home.jsx"
import {Profile} from "./pages/profile.jsx";

export function Rotas() {
   return(
       <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}>
                <Route path="login" element={<Login />} />
                <Route path="cadastro" element={<Cadastro />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
       </BrowserRouter>
   )
}
