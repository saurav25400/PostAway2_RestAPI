import express from 'express';
import { OtpController } from './otp.controller.js';

const otpRouter=express.Router();

const otpController=new OtpController();
otpRouter.post("/create-otp",(req,res,next)=>{
otpController.createOtp(req,res,next);
})
otpRouter.post("/verify-otp",(req,res,next)=>{
    otpController.verifyOtp(req,res,next);
})
otpRouter.put("/reset-password",(req,res,next)=>{
    otpController.resetPassword(req,res,next);
})




export default otpRouter;