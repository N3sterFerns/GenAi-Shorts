import React, { useEffect, useState } from 'react'
import {Player} from '@remotion/player';
import RemotionComposition from '@/app/_components/RemotionComposition';
import { AbsoluteFill, Img, Sequence, useVideoConfig } from 'remotion';


const RemotionPlayer = ({videoData}) => {

    // const [durationInFrame, setDurationInFrame] = useState(100)
    
    
    // useEffect(() => {
    //   if (videoData) {
    //     console.log("Video data has changed:", videoData);
    //   }
    // }, [videoData]);
  const durationInFrames = videoData?.captionJson ? Number(videoData?.captionJson[videoData?.captionJson?.length - 1]?.end * 30).toFixed(0): 200
  const durationFrame = Number(durationInFrames)

  return (
    <Player 
        component={RemotionComposition}
        durationInFrames={durationFrame}
        compositionWidth={720}
        compositionHeight={1280}
        fps={30}
        controls
        style={{
            width: "23vw",
            height: "70vh"
        }}
        inputProps={{
            videoData: videoData,
            // setDurationInFrame: (frameValue)=>setDurationInFrame(frameValue)
        }}
         />
  )
}

export default RemotionPlayer