import { Button } from '@/components/ui/button'
import React from 'react'
import Authentication from './Authentication'
import Link from 'next/link'
import { GitBranchIcon } from 'lucide-react'

const Hero = () => {
  return (
    <div className='px-5 flex flex-col mt-40 items-center justify-center'>
        <h2 className='text-4xl md:text-8xl font-bold text-center w-full md:w-2/3 '>Generate Instagram & Youtube shorts for free.</h2>
        <p className='mt-2 w-full md:w-1/2 text-center opacity-50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, cum architecto, quibusdam explicabo fuga laudantium pariatur aliquid sequi ea officiis repellat accusantium nisi commodi sed, nesciunt illum dignissimos nihil. Quo.</p>
        <div className='flex gap-3 mt-3'>
          <Link href={"https://github.com/N3sterFerns"}>
            <Button size={"lg"} variant={"secondary"}><GitBranchIcon/> N3sterFerns</Button>
          </Link>
            <Authentication>
                <Button className={"cursor-pointer"} size={"lg"}>Get Started</Button>
            </Authentication>
        </div>
    </div>
  )
}

export default Hero