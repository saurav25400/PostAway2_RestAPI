import mongoose from "mongoose";

export const postSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    caption:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
    
})