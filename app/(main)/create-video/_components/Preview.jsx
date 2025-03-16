import Image from 'next/image'
import React from 'react'
import { styles } from './VideoStyles'
import { captions } from './Captions'

const Preview = ({formData}) => {
    
    const selectVideoStyle = formData && styles.find((item)=> item.name === formData?.themeStyle)
    const selectCaptionStyle = formData && captions.find((item)=> item.name === formData?.caption)
    
  return (
    <div className=' relative'>
        <Image className='object-cover border w-full h-[70vh] rounded-lg' src={selectVideoStyle?.image} 
        alt={selectVideoStyle?.name} width={400} height={300} />
        <h2 className={`${selectCaptionStyle?.style} border-none absolute bottom-14 text-5xl left-1/2 -translate-x-1/2`}>{formData?.caption}</h2>
    </div>
  )
}
 
export default Preview

// npx inngest-cli@latest dev
