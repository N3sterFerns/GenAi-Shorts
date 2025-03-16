import { useAuthContext } from '@/app/provider'
import { api } from '@/convex/_generated/api'
import { getVideoById } from '@/convex/videoData'
import { useConvex } from 'convex/react'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const VideoList = () => {
    const [videoList, setvideoList] = useState([])
    const convex = useConvex()
    const {user} = useAuthContext()

    const getVideoList = async ()=>{
        try {
            const res = await convex.query(api.videoData.GetUserVideos, {
                uid: user?._id
            });
            
            setvideoList(res)

            const isPendingVideo = res?.find((item) => item.status == "pending")
            isPendingVideo && checkVideoStatus(isPendingVideo)
        } catch (error) {
            console.log(error);
        }
    }

    const checkVideoStatus = async (isPendingVideo)=>{
        const interval = setInterval(async () => {
            const res = await convex.query(api.videoData.getVideoById, {videoId: isPendingVideo._id})
            if(res?.status == "completed"){
                clearInterval(interval)
                console.log("video Completed");
                getVideoList()
            }

            console.log("still pending");
            
        }, 5000);
    }

    useEffect(() => {
      user && getVideoList()
    }, [user])
    

  return (
    <div>
        {videoList?.length === 0 ?  
        <div className='flex items-center justify-center mt-48'><h2 className='text-3xl font-medium opacity-50'>Create a new Video</h2></div>
    : 
        <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10'>
            {videoList && videoList.map((video, i)=>(
                <Link key={i} href={"/play-video/"+video?._id}>
                    <div  className='relative overflow-hidden cursor-pointer border rounded-md'>
                        {video?.status == "completed"? <Image className='w-full rounded-md object-cover aspect-[2/3]' src={video?.images[0]} alt={video?.title} width={500} height={500}/>:(
                            <div className='aspect-[2/3] flex justify-center items-center text-2xl'>Generating...</div>
                        )}
                        <div className="absolute bottom-0 p-4 bg-black/50 w-full">
                            <h2 className='text-2xl font-semibold'>{video?.title.slice(0, 10)}{video?.title.length > 10 && "..."}</h2>
                            <h2>{moment(video?._creationTime).fromNow()}</h2>
                        </div>
                    </div>
                </Link>
            ))}
        </div>}
    </div>
  )
}

export default VideoList