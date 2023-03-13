import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Login} from "./pages/login.jsx";
import {Cadastro} from "./pages/cadastro.jsx";
import {Home} from "./pages/home.jsx"

export function Rotas() {
   return(
       <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />}>
                <Route path="login" element={<Login />} />
                <Route path="cadastro" element={<Cadastro />} />
            </Route>
        </Routes>
       </BrowserRouter>
   )
}
