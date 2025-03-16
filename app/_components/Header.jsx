"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import Authentication from './Authentication'
import { useAuthContext } from '../provider'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from 'next/link'


const Header = () => {
  const {user} = useAuthContext()
  
  return (
    <div className=' flex justify-between'>
        <div className='flex items-center gap-3'>
            <h1 className='text-xl font-bold'>VShort</h1>
        </div>
        <div>
          {!user? (
            <Authentication>
              <Button>Get Started</Button>
            </Authentication>
          ): (
          <div className='flex gap-2 items-center'>
            <Link href={`/dashboard`}>
              <Button className={"cursor-pointer"}>Dashboard</Button>
            </Link>
            <Avatar>
              <AvatarImage src={user?.picURL}/>
            </Avatar>
          </div>
          )}
        </div>
    </div>
  )
}

export default Header