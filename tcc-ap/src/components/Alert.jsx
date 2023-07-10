import { Helmet } from 'react-helmet';
import '../styles/alert.css'
import { useState, useEffect } from "react";

export function Alert({type, message, link}) {
    useEffect(() => {
      var close = document.getElementsByClassName("closebtn");
      var i;

      for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
          var div = this.parentElement;
          div.style.opacity = "0";
          setTimeout(function () { div.style.display = "none"; }, 600);
        }
      }
    }, []);
    
  return (
      <div className={"alert " + type} >
          <span className="closebtn">&times;</span>  
          <strong>{type}!</strong> {message} {link? <a href={link} target="_blank">https://login.live.com/oauth20</a>: null}
      </div>
  )
}