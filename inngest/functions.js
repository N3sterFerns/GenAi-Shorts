import axios from "axios";
import { inngest } from "./client";
import { createClient } from '@deepgram/sdk';
import { GenerateImageScript } from "@/configs/Model";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import {getServices, renderMediaOnCloudrun} from '@remotion/cloudrun/client';


export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);


const ImagePromptScript = `Generate Image prompt of {style} style with all the details for each scene for 30 seconds video: script: {script}
 - Just give specifing image prompt depends on the story line
 - Do not give camera angle image prompt
 - Follow the following schema and return JSON data (Max 4-5 Images)
 - [
    {
        imagePrompt: "",
        sceneContent: <Script Content>
    }
 ]
`


const BASE_URL = "https://aigurulab.tech"

export const GenerateVideoData = inngest.createFunction(
  { id: "genearte-video-data" },
  { event: "genearte-video-data" },
  async ({ event, step }) => {

    const { themeStyle, script, title, topic, voice, caption, recordId } = event?.data;

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL)

    const GenearteAudioFile = await step.run(
      "GenerateAudioFile",
      async () => {
            const res = await axios.post(BASE_URL+"/api/text-to-speech",
              {
                input: script,
                voice: voice,
              },
              {
                headers: {
                  "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY,
                  "Content-Type": "application/json"
                }
              }
            )

        //     console.log(res);


            return res.data.audio;
        // return "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/audio%2F1741693681107.mp3?alt=media&token=582ff28c-8b4e-487f-a593-f4f169a12dbf"
      }
    )

    const GenerateCaptions = await step.run("GenerateCaption",
      async () => {
        const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);

        const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
          { url: GenearteAudioFile },
          {
            model: 'nova-3',
            language: 'en',
          },
        );

        if (error) {
          return console.error("Error in caption");
        }

        // console.log(result.results?.channels[0]?.alternatives[0]?.words);


        return result.results?.channels[0]?.alternatives[0]?.words;

      }
    )

    const GenerateImagePrompt = await step.run("GenerateImagePrompt", async()=>{
      const prompt = ImagePromptScript.replace("{style}", themeStyle).replace("{script}", script)
      const res = await GenerateImageScript.sendMessage(prompt)
      const result = JSON.parse(res.response.text())
      return result
    })


    const GenerateImages = await step.run("GenerateImages", async () => {
      let images = [];
      images = await Promise.all(GenerateImagePrompt.map(async(e)=>{
        const result = await axios.post(BASE_URL+'/api/generate-image',
          {
              width: 1080,
              height: 1280,
              input: e?.imagePrompt,
              model: 'sdxl',
              aspectRatio:"9:16"
          },
          {
              headers: {
                  'x-api-key': process.env.NEXT_PUBLIC_AIGURULAB_API_KEY,
                  'Content-Type': 'application/json', 
              },
          })
          return result?.data?.image
      }))
      return images;
      // return ["https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1741865196404.png?alt=media&token=473f176c-7496-4ace-9e62-84244c8762bb", "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1741865199638.png?alt=media&token=0b7e75b0-43c4-40db-8501-24789bc2a52b", "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1741865198772.png?alt=media&token=17f11885-e90f-4606-b12b-41c8f8430068", "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1741865193721.png?alt=media&token=3abade58-d1d8-4f47-9dea-9adcd2405c38", "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1741865195308.png?alt=media&token=404be1a5-3139-4988-987b-a6ac1efcef52"]
    })


    const UpdateDB = await step.run("UpdateDB", async () => {
      const res = await convex.mutation(api.videoData.UpdateVideoRecord, {
        recordId: recordId,
        audioUrl: GenearteAudioFile,
        images: GenerateImages,
        captionJson: GenerateCaptions,
      })

      return res;
    })

    const renderVideo = await step.run("renderVideo", async ()=>{
      const services = await getServices({
        region: 'us-east1',
        compatibleOnly: true,
      });

      const serviceName = services[0].serviceName;

      const result = await renderMediaOnCloudrun({
        serviceName,
        region: 'us-east1',
        serveUrl: process.env.GCP_SERVE_URL,
        composition: 'videoRender',
        inputProps: {
          videoData: {
            audioUrl: GenearteAudioFile,
            captionJson: GenerateCaptions,
            images: GenerateImages
          }
        },
        codec: 'h264',
      });
       
      // if (result.type === 'success') {
      //   console.log(result?.bucketName);
      //   console.log(result);
      // }

      

      return result?.publicUrl;
      // return result;
    })

    const UpdateDownloadUrl = await step.run("UpdateDownloadUrl", async ()=>{
      if(renderVideo){
        const res = await convex.mutation(api.videoData.UpdateVideoRecord, {
          recordId: recordId,
          audioUrl: GenearteAudioFile,
          images: GenerateImages,
          captionJson: GenerateCaptions,
          downloadUrl: renderVideo,
        })
        return res
      }else{
        throw new Error("Render Video URl is not available")
      }
    })



    return UpdateDownloadUrl;
  });