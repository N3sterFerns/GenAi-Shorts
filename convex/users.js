import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser = mutation({
    args:{
        name: v.string(),
        picURL: v.string(),
        email: v.string()
    },
    handler: async(ctx, args)=>{
        const user = await ctx.db.query("users")
        .filter((u)=> u.eq(u.field("email"), args.email))
        .collect()

        if(!user[0]?.email){
            const result = await ctx.db.insert("users", {
                name: args.name,
                email: args.email,
                picURL: args.picURL
            })
            return result;
        }

        return user[0]
    }
})