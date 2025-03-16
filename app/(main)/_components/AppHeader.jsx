"use client"
import { useAuthContext } from '@/app/provider'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

const AppHeader = () => {
  const {user} = useAuthContext()
  return (
    <div className='p-3 flex w-full justify-between'>
        <SidebarTrigger/>
      <div>
        <Avatar>
          <AvatarImage src={user?.picURL} width={30} height={30} className='rounded-full' />
        </Avatar>
      </div>
    </div>
  )
}

export default AppHeader