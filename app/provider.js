"use client"
import React, { useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/configs/firebase.config'
import { AuthContext } from './_context/AuthContext'
import { useMutation } from "convex/react";
import ClientConvexProvider from './ClientConvexProvider'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'

const Provider = ({children}) => {

  const [user, setUser] = useState(null)
  const router = useRouter()

  const createUser = useMutation(api.users.CreateNewUser);


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, async (user)=>{
      if(user){
        const createUserAcc = await createUser({
          name: user?.displayName,
          email: user?.email,
          picURL: user?.photoURL,
        })
        setUser(createUserAcc)
        router.push("/dashboard")
      }
      
    })
    return ()=> unsubscribe()
  }, [])
  return (
    <div>
      {/* <ClientConvexProvider> */}
        <AuthContext.Provider value={{user}}>
          <NextThemesProvider 
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
              {children}
          </NextThemesProvider>
        </AuthContext.Provider>
      {/* </ClientConvexProvider> */}
    </div>
  )
}

export const useAuthContext = ()=>{
  return useContext(AuthContext)
}

export default Provider