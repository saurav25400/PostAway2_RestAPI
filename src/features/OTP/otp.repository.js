import mongoose from "mongoose";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { otpSchema } from "./otp.schema.js";

const otpModel=mongoose.model("OTP",otpSchema);
export class OtpRepository{

    async createOtp(email,otp){
        try{
            const newOtp=new otpModel({email:email,otp:otp});
             const res=await newOtp.save();
             if(res){
                return true;
             }
             else{
                return false;
             }
        }
        catch(error){
            throw new ApplicationError("error while generating otp",500);
        }
    }

    async verifyOtp(otp,email){
        try{
            //return the most recent otp  stored in databse
            const otpObject=await otpModel.findOne({email:email}).sort({createdAt: -1}).limit(1);
            //verify databse otp with user  otp..
            if(otpObject.otp===otp){
                return true;
            }
            return false;
            

        }
        catch(error){
            throw new ApplicationError("otp is not valid!!!",400);
        }


    }

    async checkDbOtpExist(email){
        try{
           const deleteAllOtp=await otpModel.deleteMany({email:email});
                if(deleteAllOtp.deletedCount>0){
                    return true;  
                }
                else{
                    return false;
                }
          
        }
        catch(error){
            throw new ApplicationError("error while checking otp exist ot  not !!!",400);
        }
    }

   

}