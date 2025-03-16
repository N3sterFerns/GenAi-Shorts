import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const formData = await req.json();
    console.log(formData);
    
    const res = await inngest.send({
        name: "genearte-video-data",
        data:{
            ...formData
        }
    })

    return NextResponse.json({result: res})
}