import { NewRequest } from '../components/NewRequest.jsx';
import { GetRequest } from '../components/GetRequest';
import { Logout } from '../components/Logout';
import { useState, useEffect } from "react";
import { Navbar } from '../components/Navbar.jsx'
import '../styles/global.css'
export function Home() {
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
      <Navbar page="home"/>
      <h1>Hello</h1>
      <NewRequest />
      <GetRequest />
      <Logout />
    </div>
  )
}