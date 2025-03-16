import { useMutation } from "convex/react";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const createVideoData = mutation({
    args: {
        title:  v.string(),
        topic:  v.string(),
        script:  v.string(),
        videoStyle:  v.string(),
        voice:  v.string(),
        images:  v.optional(v.any()),
        caption:  v.any(),
        uid:  v.id("users"),
        createdBy:  v.string(),
        // status: v.optional(v.string()) 
    },
    handler: async (ctx, args)=>{
        const result = await ctx.db.insert("videoData", {
            title:  args.title,
            topic:  args.topic,
            script:  args.script,
            videoStyle:  args.videoStyle,
            voice:  args.voice,
            caption:  args.caption,
            uid:  args.uid,
            createdBy:  args.createdBy,
            status: "pending"
        })

        return result;
    }
})


export const UpdateVideoRecord = mutation({
    args: {
        recordId: v.id("videoData"),
        audioUrl: v.optional(v.any()),
        images: v.optional(v.any()),
        captionJson: v.optional(v.any()),
        downloadUrl: v.optional(v.string())
    },
    handler: async (ctx, args)=>{
        const res = await ctx.db.patch(args.recordId, {
            audioUrl: args.audioUrl,
            images: args.images,
            captionJson: args.captionJson,
            status: "completed",
            downloadUrl:args.downloadUrl
        })

        return res;
    }
})


export const GetUserVideos = query({
    args: {
        uid: v.id("users")
    },
    handler: async (ctx, args)=>{
        const res = await ctx.db.query("videoData")
        .filter((f)=> f.eq(f.field("uid"), args.uid))
        .order("desc").collect()

        return res;
    }
})


export const  getVideoById = query({
    args: {
        videoId: v.id("videoData")
    },
    handler: async (ctx, args)=>{
        const res = await ctx.db.get(args.videoId)
        return res;
    }
})