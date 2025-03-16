const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Write a two different script for 30 seconds video on Topic:  Science\n1) Do not add Scene description\n2) Do not add anything in braces, Just return the plain story in text\n3) Give me response in JSON format and follow the Schema\n{\nscripts:[\n{\ncontent: ""\n}\n]\n}',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "scripts": [\n    {\n      "content": "Hey there! Ever wonder why the sky is blue? It\'s all thanks to science! Tiny particles in the air scatter blue light from the sun more than other colors. That\'s why we see a beautiful blue sky. Science is all around us, explaining the wonders of the world, from the smallest atom to the largest galaxy. So keep exploring, keep questioning, and keep discovering the amazing power of science!"\n    },\n    {\n      "content": "Imagine a world without science. No smartphones, no lifesaving medicine, no understanding of the universe. Science is the engine of progress, driving innovation and shaping our future. From renewable energy to space exploration, science is constantly pushing the boundaries of what\'s possible. Join the adventure and unlock the secrets of our world, one experiment at a time!"\n    }\n  ]\n}\n```',
        },
      ],
    },
  ],
});

export const GenerateImageScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate Image prompt of Cinematic style with all the details for each scene for 30 seconds video: script: Rose Park\n - Just give specifing image prompt depends on the story line\n - Do not give camera angle image prompt\n - Follow the following schema and return JSON data (Max 4-5 Images)\n - [\n    {\n        imagePrompt: \"\",\n        sceneContent: <Script Content>\n    }\n ]\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "I am able to generate image prompts for you based on the provided script and style. However, the capability to generate actual images is only enabled for early testers. I will provide you with the JSON data containing the image prompts, following the schema you've outlined.\n\nPlease provide the desired `style` and `script` so I can generate the appropriate image prompts.\n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "Generate Image prompt of Cinematic style with all the details for each scene for 30 seconds video: script: Want to boost your mood instantly? Try listening to your favorite upbeat music! Studies show music releases dopamine in the brain, creating feelings of happiness and joy. Singing along amplifies the effect. So turn up the volume, let loose, and let the music lift your spirits. It's a simple, effective way to brighten your day!\n\nJust give specifing image prompt depends on the story line\n\nDo not give camera angle image prompt\n\nFollow the following schema and return JSON data (Max 4-5 Images)\n\n[\n{\nimagePrompt: \"\",\nsceneContent: <Script Content>\n}\n]\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "Please provide the script for Rose Park. I need the script to create the image prompts. Once you provide the script, I'll create the JSON data with the `imagePrompt` and `sceneContent` for each scene, as requested.\n"},
      ],
    },
    {
      role: "user",
      parts: [
        {text: "Generate Image prompt of Cinematic style with all the details for each scene for 30 seconds video: script: Want to boost your mood instantly? Try listening to your favorite upbeat music! Studies show music releases dopamine in the brain, creating feelings of happiness and joy. Singing along amplifies the effect. So turn up the volume, let loose, and let the music lift your spirits. It's a simple, effective way to brighten your day!\n\nJust give specifing image prompt depends on the story line\n\nDo not give camera angle image prompt\n\nFollow the following schema and return JSON data (Max 4-5 Images)\n\n[\n{\nimagePrompt: \"\",\nsceneContent: <Script Content>\n}\n]\n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n[\n  {\n    \"imagePrompt\": \"Close-up of a diverse range of people looking slightly downcast or neutral. Muted color palette. Focus on their faces and expressions, hinting at a need for a mood boost.\",\n    \"sceneContent\": \"Want to boost your mood instantly?\"\n  },\n  {\n    \"imagePrompt\": \"A person wearing headphones, eyes closed, with a subtle smile starting to form. Bright, vibrant colors subtly introduced. Suggestion of musical notes or sound waves emanating from the headphones in a visually abstract way.\",\n    \"sceneContent\": \"Try listening to your favorite upbeat music!\"\n  },\n  {\n    \"imagePrompt\": \"Scientific visualization of dopamine release in the brain. Abstract and artistic representation of neural pathways lighting up with bright colors. Suggests happiness and joy.\",\n    \"sceneContent\": \"Studies show music releases dopamine in the brain, creating feelings of happiness and joy.\"\n  },\n  {\n    \"imagePrompt\": \"Person enthusiastically singing along to music in a car. Windows rolled down, wind in their hair. Bright, sunny day. Colors are vivid and saturated. Pure expression of joy and freedom.\",\n    \"sceneContent\": \"Singing along amplifies the effect.\"\n  },\n  {\n    \"imagePrompt\": \"A montage of diverse people dancing, smiling, and enjoying themselves in various settings: at home, in a park, at a concert. A feeling of collective joy and energy. The final shot focuses on a smiling face looking directly at the viewer, conveying a sense of upliftment.\",\n    \"sceneContent\": \"So turn up the volume, let loose, and let the music lift your spirits. It's a simple, effective way to brighten your day!\"\n  }\n]\n```\n"},
      ],
    },
  ],
})