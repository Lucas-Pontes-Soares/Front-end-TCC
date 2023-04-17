import { useState, useEffect } from "react";

export function GetRequestByUserId() {

    const [result, setResult] = useState([]);

    useEffect(() => {
        (async () => {
          try {
            const userId = localStorage.getItem('userId');
    
            const resultado = await fetch(
              `http://localhost:3000/playerrequest/getPlayerRequestById/${userId}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
            const resultadoJson = await resultado.json();
            if (resultadoJson) {
              setResult(resultadoJson.Requisição);
            }
          } catch (err) {
            console.log(err);
          }
        })();
      }, []);


    return (
        <div>
            <h1>Hello</h1>
            {result.map((item) => (
                <button key={item._id}>{item._id}</button>
            ))}
        </div>
    )
}