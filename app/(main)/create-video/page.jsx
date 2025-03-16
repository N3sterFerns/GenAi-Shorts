"use client"
import React, { useState } from 'react'
import Topics from './_components/Topics'
import VideoStyles from './_components/VideoStyles'
import Voices from './_components/Voices'
import Captions from './_components/Captions'
import { Button } from '@/components/ui/button'
import Preview from './_components/Preview'
import axios from 'axios'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useAuthContext } from '@/app/provider'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'

const CreateVideo = () => {

    const [formData, setFormData] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const {user} = useAuthContext()

    const CreateVideoRecord = useMutation(api.videoData.createVideoData)

    const handleFormData = (inputName, inputValue)=>{
        setFormData((prev)=> ({
            ...prev, 
            [inputName]: inputValue
        }))
        console.log(formData);
    }

    const GenerateVideo = async ()=>{
        if(!formData?.themeStyle || !formData?.script || !formData?.title || !formData?.topic || !formData?.voice || !formData?.caption){
            console.log("fields empty");
            
            return
        }

        setLoading(true)

        const result = await CreateVideoRecord({
            title:  formData?.title,
            topic:  formData?.topic,
            script:  formData?.script,
            videoStyle:  formData?.themeStyle,
            voice:  formData?.voice,
            caption:  formData?.caption,
            uid:  user?._id,
            createdBy:  user?.email
        })        

        await axios.post("/api/generate-video-data", {...formData, recordId: result})
        setLoading(false)

        router.push("/dashboard")
    }


  return (
    <div>
        <h1 className='text-4xl font-semibold my-5 opacity-80'>Create Your Vison</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 '>
            <div className='col-span-1 p-7 border rounded-xl h-[70vh] overflow-auto'>
                <Topics onHandleFormData={handleFormData}/>
                <VideoStyles onHandleFormData={handleFormData}/>
                <Voices onHandleFormData={handleFormData}/>
                <Captions onHandleFormData={handleFormData}/>
                <Button onClick={GenerateVideo} className="w-full p-5 my-7 cursor-pointer bg-white">{loading ? <Loader2Icon className='animate-spin'/>: "Generate Video"}</Button>
            </div>
            

            <div >
                {/* <h1 className='font-bold text-2xl'>Preview</h1> */}
                <Preview formData={formData} />
            </div>
        </div>
    </div>
  )
}

export default CreateVideo