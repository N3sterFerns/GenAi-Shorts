import Image from 'next/image'
import React, { useState } from 'react'

export const styles = [
    {
        name: "Realistic",
        image: "/images/realistic.jpeg"
    },
    {
        name: "Cinematic",
        image: "/images/cinematic.png"
    },
    {
        name: "Cartoon",
        image: "/images/cartoon.png"
    },
]

const VideoStyles = ({onHandleFormData}) => {

    const [selectedStyle, setSelectedStyle] = useState("")
    



  return (
    <div>
        <div className='mt-3'>
            <h2 className='text-sm font-semibold'>Video Styles</h2>
            <p className='text-sm mt-2 opacity-50 py-1'>Select a style</p>

            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2'>
                {styles?.map((style, i)=>(
                    <div className=' relative overflow-hidden ' key={i+1}
                    onClick={()=>{
                        setSelectedStyle(style.name)
                        onHandleFormData("themeStyle", style.name)
                    }}>
                        <Image className={` ${selectedStyle === style.name && "border border-white"} object-cover hover:border hover:border-white rounded-md h-[5rem] lg:h-[6rem] cursor-pointer
                        `} src={style.image} alt={style.name} width={500} height={150}/>
                        <h3 className='absolute bottom-2  opacity-90 left-1/2 -translate-x-1/2 text-sm pointer-events-none'>{style.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default VideoStyles