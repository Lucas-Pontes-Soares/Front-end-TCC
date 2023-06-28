import { NewRequest } from '../components/NewRequest.jsx';
import { GetRequest } from '../components/GetRequest.jsx';
import { Logout } from '../components/Logout.jsx';
import { useState, useEffect } from "react";
import { Navbar } from '../components/Navbar.jsx'
import '../styles/global.css'

export function Jogadores() {
  useEffect(() => {
    const authToken = localStorage.getItem("AuthToken")
    if (authToken) {
      console.log("Vc esta logado")
    } else {
      console.log("Realize seu login")
    }
  })

  return (
    <div className='divPrincipal'>
      <Navbar page="jogadores"/>
      <h1>Hello</h1>
      <NewRequest />
      <GetRequest />
      <Logout />
    </div>
  )
}