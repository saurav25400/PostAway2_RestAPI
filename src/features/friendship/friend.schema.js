import mongoose from "mongoose";

export const friendSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    friends:[
       {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
})