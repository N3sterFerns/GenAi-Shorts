"use client"
import { useAuthContext } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation'
import React from 'react'

const AppHeader = () => {
  const {user} = useAuthContext()
  const auth = getAuth();
  const router = useRouter()

  const logOut = ()=>{
    signOut(auth).then(() => {
      router.push("/")
    }).catch((error) => {
      router.push("/dashboard")
    });
  }

  return (
    <div className='p-3 flex w-full justify-between'>
        <SidebarTrigger/>
      <div className='flex items-center gap-3'>
        <Avatar>
          <AvatarImage src={user?.picURL} width={30} height={30} className='rounded-full' />
        </Avatar>
        <Button onClick={logOut} className={"cursor-pointer"} variant="outline">Logout</Button>
      </div>
    </div>
  )
}

export default AppHeader