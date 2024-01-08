import mongoose from "mongoose";

export const commentSchema=new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    userComments:[
        {
            comment:{
                type:String,
                required:true
            },
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            }

        }
    ]
})