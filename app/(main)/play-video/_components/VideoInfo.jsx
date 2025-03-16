import { Button } from '@/components/ui/button';
import { ArrowLeft, DownloadIcon, Loader2Icon } from 'lucide-react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const VideoInfo = ({videoData}) => {

  const [downloadStatus, setDownloadStatus] = useState(false)
  const [url, setUrl] = useState("#")
  
  const downloadVideo = ()=>{
    const videoURL = videoData?.downloadUrl;
    setDownloadStatus(false)
    if(videoURL){
      setUrl(videoURL)
      setDownloadStatus(true)
    }
  }


  useEffect(()=>{
    videoData && downloadVideo()
  }, [videoData])
  
  return (
    <div className='w-full '>
      <Link href="/dashboard">
        <h3 className='font-medium flex gap-2'><ArrowLeft/> Go to Dashboard</h3>
      </Link>
      <div className='mt-4 text-2xl'>
        <h2 className='font-semibold text-2xl'>Project Title: {videoData?.title}</h2>
        <p className='text-sm opacity-40 mt-4'>{videoData?.script}</p>
        <h2 className=' mt-2 text-sm'>Video Style: {videoData?.videoStyle}</h2>
        <Link href={url}>
          <Button disabled={!downloadStatus} className={`mt-3 w-full cursor-pointer `}>{downloadStatus ? <><DownloadIcon/> <span>Download Video</span></>: <> <Loader2Icon className='animate-spin'/><span>Processing Video</span></>}</Button>
        </Link>
        <h3 className={`text-sm text-gray-500 mt-2 ${downloadStatus ? "hidden": "block"}`}>Processing might take 2/5 mins</h3>
      </div>
    </div>
  )
}

export default VideoInfo