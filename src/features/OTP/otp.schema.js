import mongoose from "mongoose";

export const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5  //the document will be deleted after  5 minutes. of its creation time.
    }
})