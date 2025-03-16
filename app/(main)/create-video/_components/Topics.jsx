"use client"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,} from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'


const suggestions = [
    "Historic Story",
    "Kids Story",
    "Movies Stories",
    "AI Stories",
    "Horror Stories",
    "Science Stories",
    "Motivational Stories",
]

const Topics = ({onHandleFormData}) => {

    const [selectedIdea, setSelectedIdea] = useState("")
    const [selectedScriptIndex, setSelectedScriptIndex] = useState(null)
    const [scripts, setScripts] = useState(null)
    const [loading, setLoading] = useState(false)

    const GenerateScript = async ()=>{
        setLoading(true)
        const res = await axios.post("/api/generate-script", {
            topic: selectedIdea
        })

        console.log(res.data);
        setScripts(res?.data?.scripts)
        setLoading(false)
    }



  return (
    <div>
        <div className=''>
            <h2 className='text-sm font-semibold'>Video Title</h2>
            <Input onChange={(e)=> onHandleFormData("title", e.target.value)} className={"mt-2 p-3"} placeholder="Enter Your Vision"/>
        </div>
        <div className='mt-7'>
            <h2 className='text-sm font-semibold'>Video Topic</h2>
            <p className='text-sm mt-2 opacity-50 py-1'>Select your choice</p>
            <Tabs defaultValue="suggestions" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                    <TabsTrigger value="custom_topic">Custom</TabsTrigger>
                </TabsList>
                <TabsContent value="suggestions">
                    <div  className={"flex flex-wrap w-full gap-2"}>
                        {suggestions.map((suggest, i)=>(
                            <Button onClick={()=>{
                                setSelectedIdea(suggest)
                                onHandleFormData("topic", suggest)
                            }
                            } className={`cursor-pointer ${selectedIdea == suggest && "bg-secondary"}`} variant={"outline"} key={i}>{suggest}</Button>
                        ))}

                    </div>
                </TabsContent>
                <TabsContent value="custom_topic">
                    <h2 className='text-sm mt-2 opacity-50 py-1' >Custom Suggestion</h2>
                    <Textarea onChange={(e)=>onHandleFormData("topic", e.target.value)} placeholder="Enter your Vision" />
                </TabsContent>
            </Tabs>
            
            {scripts?.length > 0 && <div className='mt-3 '>
                <h2 className='text-sm mt-2 opacity-50 py-1'>Select a Script</h2>
                <div className=' grid grid-cols-2 overflow-y-auto gap-3'>
                    {scripts?.map((item, i)=>(
                        <div key={i}
                        onClick={()=> {
                            setSelectedScriptIndex(i)                            
                            onHandleFormData("script", item.content)
                        }} className={` cursor-pointer transition-all rounded-md border p-3 ${selectedScriptIndex == i && "bg-secondary border-white"}`}>
                            <h2 className=' text-sm'>{item.content}</h2>
                        </div>
                    ))}
                </div>
            </div>}

        </div>
        {!scripts && (
            <Button onClick={GenerateScript} className={"mt-3"} size={"sm"} disabled={loading}>
            {loading? <Loader2Icon className='animate-spin'/> : "Generate Script"}</Button>
        )}
    </div>
  )
}


export default Topics