"use client"
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Button } from '@/components/ui/button'
import { HomeIcon, Search, LucideFileVideo, GitBranchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MenuItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: HomeIcon
  },
  {
    title: "Create New Video",
    url: "/create-video",
    icon: LucideFileVideo
  },
  {
    title: "GitHub",
    url: "https://github.com/N3sterFerns",
    icon: GitBranchIcon
  },
]

const AppSideBar = () => {
  const path = usePathname()
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className='font-bold text-center text-3xl'>Gen Shorts</h2>
        <h3 className='text-center font-sans text-xl mt-5 opacity-50'>Reels Ai Generator</h3>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className='mx-2'>
              <Link href={"/create-video"}>
                <Button className={"rounded-sm w-full cursor-pointer"}>Create New Video</Button>
              </Link>
            </div>

            <SidebarMenu>
              {MenuItems.map((item, i)=>(
                <SidebarMenuItem key={i} className={"mt-3"}>
                  <SidebarMenuButton isActive={path==item.url} className={"py-5"}>
                    <Link href={item.url} className={"flex p-5 items-center gap-3"}>
                      {item.icon && <item.icon/>}
                      <span className='font-semibold'>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSideBar