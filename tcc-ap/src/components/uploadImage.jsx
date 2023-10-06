import React, { useEffect, useRef } from "react";
import styles from '../styles/uploadImage.module.css'

export function UploadImage() {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'gplink',
            uploadPreset: 'remdr0jv'
        }, function(error, result){
            console.log(result)
            //result.info tem as informações da imagem
            //o result fica atualizando, apenas quando seleciona a imagem ele guarda as informações
            //ou seja, só salvar os dados quando não for undefined
            if(result.info.url){
                const url = result.info.url;
                console.log(url)
                //atualizar no banco com a url da imagem do individuo
                updateImageUser(url)
            }
        });
}, [])

async function updateImageUser(url){
    const requestBody = {
        image: url
    }
    try{
        const userId = localStorage.getItem("userId")
        const authToken = localStorage.getItem("AuthToken")
        const response = await fetch(`${process.env.REACT_APP_URLBackend}/user/updateUser/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token: authToken
            },
            body: JSON.stringify(requestBody)
        })
        const resposta = await response.json()
        console.log(resposta)
    }catch(erro){
        console.log("erro "+ erro)
    }
}

  return (
    <div>
        <button className={styles.btnUpload}onClick={() => widgetRef.current.open()}>
            Mudar foto
        </button>
    </div>
  );
}
