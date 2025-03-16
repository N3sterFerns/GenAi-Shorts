"use client"
import React from 'react'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '@/configs/firebase.config';

const Authentication = ({children}) => {
  const provider = new GoogleAuthProvider();

  const signInPopUp = ()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        
    }).catch((error) => {
      console.log("Erro");
      
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }


  return (
    <div onClick={signInPopUp}>{children}</div>
  )
}

export default Authentication