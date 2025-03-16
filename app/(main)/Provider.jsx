"use client"
import React, { useEffect } from 'react'
import AppSideBar from './_components/AppSideBar'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppHeader from './_components/AppHeader'
import { useAuthContext } from '../provider'
import { useRouter } from 'next/navigation'

const DashboardProvider = ({children}) => {
  const user = useAuthContext()
  const router = useRouter()

  const isAuthenticated = ()=>{
    if(!user){
      router.push("/")
    }
  }

  useEffect(() => {
    user && isAuthenticated()
  }, [user])

  

  return (
    <SidebarProvider>
      <AppSideBar/>
      <div className='w-full'>
        <AppHeader/>
        <div className='p-10'>
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardProvider