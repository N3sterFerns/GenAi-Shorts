import React, { useState } from 'react'

export const captions = [
    {
        name: "Youtuber",
        style: "text-yellow-400 rounded-md border hover:border-white cursor-pointer p-3 text-3xl font-extrabold uppercase drop-shadow-lg"
    },
    {
        name: "Supreme",
        style: "text-white rounded-md border hover:border-white cursor-pointer p-3 text-3xl font-extrabold uppercase drop-shadow-lg"
    },
    {
        name: "Neom",
        style: "text-green-500 rounded-md border hover:border-white cursor-pointer p-3 text-3xl font-extrabold uppercase drop-shadow-lg"
    },
    {
        name: "Glitch",
        style: "text-pink-400 rounded-md border hover:border-white cursor-pointer p-3 text-3xl font-extrabold uppercase drop-shadow-lg"
    },
]
const Captions = ({onHandleFormData}) => {

    const [selectedCaption, setSelectedCaption] = useState("")


  return (
    <div>
        <h2 className='text-sm font-semibold mt-4'>Captions</h2>
        <p className='text-sm mt-2 opacity-50 py-1'>Select one caption</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 '>
            {captions.map((caption, i)=>(
                <div key={i} className='' onClick={()=>{
                    setSelectedCaption(caption.name)
                    onHandleFormData("caption", caption.name)
                }}>
                    <h2 className={`${caption.style} ${selectedCaption==caption.name && "border-white"}`}>{caption.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Captions