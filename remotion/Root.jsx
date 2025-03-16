import React from 'react'
import { Composition } from 'remotion'
import { MyComposition } from './Composition'
import RemotionComposition from '../app/_components/RemotionComposition'

const videoData = {
  audioUrl: "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/audio%2F1741693681107.mp3?alt=media&token=582ff28c-8b4e-487f-a593-f4f169a12dbf",
  captionJson: [
    {
      confidence: 0.99803513,
      end: 0.79999995,
      start: 0.39999998,
      word: "once",
    },
    {
      confidence: 0.97404367,
      end: 1.12,
      start: 0.79999995,
      word: "upon",
    },
    {
      confidence: 0.9999306,
      end: 1.28,
      start: 1.12,
      word: "a",
    },
    {
      confidence: 0.9959272,
      end: 1.68,
      start: 1.28,
      word: "time",
    },
    {
      confidence: 0.8921633,
      end: 2.08,
      start: 1.68,
      word: "marie",
    },
    {
      confidence: 0.9952359,
      end: 2.72,
      start: 2.08,
      word: "curie",
    },
    {
      confidence: 0.9995697,
      end: 2.96,
      start: 2.72,
      word: "a",
    },
    {
      confidence: 0.9995321,
      end: 3.36,
      start: 2.96,
      word: "brilliant",
    },
    {
      confidence: 0.99844307,
      end: 4.3199997,
      start: 3.36,
      word: "scientist",
    }, 
  ],
  images: [
    "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1741865196404.png?alt=media&token=473f176c-7496-4ace-9e62-84244c8762bb",
    "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1741865199638.png?alt=media&token=0b7e75b0-43c4-40db-8501-24789bc2a52b",
    "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1741865198772.png?alt=media&token=17f11885-e90f-4606-b12b-41c8f8430068",
  ]
}



const Root = () => {
  const durationInFrames = Number(videoData?.captionJson[videoData?.captionJson?.length - 1]?.end * 30).toFixed(0);
  const durationFrame = Number(durationInFrames)
  console.log(typeof durationFrame);
  console.log(durationFrame);

  return (
    <>
      <Composition
        id="videoRender"
        component={RemotionComposition}
        durationInFrames={durationFrame}
        fps={30}
        // width={1280}
        width={1080}
        // height={720}
        height={1920}
        defaultProps={{
          videoData: videoData
        }}
      />
    </>
  )
}

export default Root