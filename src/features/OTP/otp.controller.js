import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';
import { OtpRepository } from "./otp.repository.js";
import sendOtpInmail from '../../../utils/mailsender.js';
import { UserRepository } from '../user/user.repository.js';

export class OtpController{
    static globalVar=false;
    constructor(){
        this.otpRepository=new OtpRepository();
        this.userRepository=new UserRepository();
       
    }
    async createOtp(req,res,next){
        try{
            const {email}=req.body;

            const isUserExist=await this.userRepository.findByEmail(email);
            if(!isUserExist){
                return res.status(400).send('Email is not registered!!!');
            }
            const otp=otpGenerator.generate(6,{upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,})
                console.log('otp',otp);
                const isCreated=await this.otpRepository.createOtp(email,otp);
                const mailResponse=await sendOtpInmail(email,otp);
                if(mailResponse.success&&isCreated){
                    return res.status(200).json({success:true,message:"please check your email!!!,OTP sent successfully on your app registered  email"})
                }
                else{
                    return res.status(400).send("email is not valid or it is not registered.")
                }
        }
        catch(err){
            console.log(err);
            next(err);
        }
       



    }
    async verifyOtp(req,res,next){
        try{
            const {otp}=req.body;
            const usersEmail=req.userEmail;
            const result=await this.otpRepository.verifyOtp(otp,usersEmail);
            if(result){
                return res.status(200).send("OTP has been verified successfully");
              
            }
           else{
            return res.status(400).send("OTP is not valid!!!");
           }
        }
        catch(err){
            next(err);
        }

    }

    async resetPassword(req,res,next){
        const {newPassword}=req.body;
        try{
            const isExistedOtpDeleted=await this.otpRepository.checkDbOtpExist(req.userEmail);
            if(!isExistedOtpDeleted){
                return res.status(400).send("To reset password,first verify your registered email!!!")
            }
            else{
                const hashedPassword=await bcrypt.hash(newPassword,12);
                const resultObject=await this.userRepository.resetPassword(hashedPassword,req.userId);
                if(resultObject.success){
                    return res.status(200).send(resultObject.message);
                }
                else{
                    return res.status(401).send("password reset failed!!!");
                }
            }


        }
        catch(err){
            next(err)
        }
    }
   
}