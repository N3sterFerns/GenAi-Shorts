"use client"
import React, { useEffect, useState } from 'react'
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { captions as capStyle } from '../(main)/create-video/_components/Captions';

const RemotionComposition = ({videoData}) => {
  // const [totalDuration, setTotalDuration] = useState(0);
  
  const captions = videoData?.captionJson;
  const imageList = videoData?.images;
  const {fps} = useVideoConfig()

  const captionsStyle = capStyle.find((cap)=> cap.name === videoData?.caption)
  
  const frame = useCurrentFrame()
  
  const getDurationFrame = ()=>{
    const totalDuration = captions[captions?.length -1]?.end * fps;
    // setDurationInFrame(totalDuration)
    return totalDuration
  }

  const getCurrentCaption = ()=>{
    const currentTime = frame/ 30;
    const currentCaption = captions?.find((i)=> currentTime>=i.start && currentTime <= i.end)
    return currentCaption? currentCaption?.word : "";
  }
  
  
  
  useEffect(() => {
    videoData && getDurationFrame()
    console.log(videoData);
    
  }, [videoData])


  return (
    <div>
      <AbsoluteFill>
          {imageList?.map((image, index)=>{
            const startTime = (index * getDurationFrame()) / imageList?.length;
            const scale = (index)=>interpolate(frame, 
              [startTime, startTime+getDurationFrame()/2, startTime+getDurationFrame()],
              index%2==0? [1, 1.8, 1]: [1.8,1, 1.8],
              {extrapolateLeft: "clamp", extrapolateRight: "clamp"}
            ) 
            return (
              <Sequence key={index} from={startTime} durationInFrames={getDurationFrame()}>
                  <AbsoluteFill>
                    <Img className='w-full h-full' src={image} style={{width: "100%", height: "100%", objectFit: "cover",
                      transform: `scale(${scale(index)})`
                    }}/>
                  </AbsoluteFill>
              </Sequence>
            )
          })}
          {videoData && <Audio src={videoData?.audioUrl}/>}
          
          <AbsoluteFill 
            className={`${captionsStyle?.style} border-none`}
            style={{
              // color: ``,
              justifyContent: "center",
              bottom: 50,
              height: 150,
              top: undefined,
              fontSize: "5rem",
              textAlign: "center"}}>
            <h2>{getCurrentCaption()}</h2>
          </AbsoluteFill>
      </AbsoluteFill>
    </div>
  )
}

export default RemotionComposition