"use client"
import React, { useEffect, useState } from 'react'
import RemotionPlayer from '../_components/RemotionPlayer'
import VideoInfo from '../_components/VideoInfo'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useParams } from 'next/navigation'

const PlayVideo = () => {
    const [videoData, setVideoData] = useState(null)
    const {videoid} = useParams()
    
    const convex = useConvex()
    const GetVideoData = async ()=>{
        const res = await convex.query(api.videoData.getVideoById, {
            videoId: videoid
        })
        setVideoData(res)
    }
    
    useEffect(() => {        
        videoid && GetVideoData()
    }, [videoid])

    // useEffect(() => {
    //   if(videoData){
    //     console.log(videoData);
        
    //   }
    // }, [videoData])
    

  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
            <RemotionPlayer videoData={videoData}/>
        </div>
        <div>
            <VideoInfo videoData={videoData}/>
        </div>
    </div>
  )
}

export default PlayVideo