import { generateScript } from "@/configs/Model"
import { NextResponse } from "next/server"

const Script = `Write a two different script for 30 seconds video on Topic:  {{topic}}
1) Do not add Scene description
2) Do not add anything in braces, Just return the plain story in text
3) Give me response in JSON format and follow the Schema
{scripts: [
    {
        content: ""
    },
]}`

export async function POST(req) {
    const {topic} = await req.json()

    const prompt = Script.replace("{{topic}}", topic)

    const res = await generateScript.sendMessage(prompt)

    const output = res?.response?.text();

    return NextResponse.json(JSON.parse(output));
} 


