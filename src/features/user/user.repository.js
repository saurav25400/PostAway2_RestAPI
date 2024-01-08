import mongoose from "mongoose"
import { userSchema } from "./user.schema.js"
import { ApplicationError } from "../../error-handler/applicationError.js";



const userDbModel=mongoose.model('User',userSchema);
export class UserRepository{
    constructor(){}

    async signUp(userData){
        try{
            const user=new userDbModel(userData);
            return await user.save().select('-tokens -password');
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("user is not able to registered.",400);
        }
    }
    async findByEmail(email){
        try{
            if(email){
                return await userDbModel.findOne({email:email});
    
            }
            else{
                return false;
            }
        }
        catch(err){
           throw new ApplicationError("Invalid credentials",400);
        }
    }

    async setTokenToDb(userId,token){
        try{
            const user=await userDbModel.findById(userId);
            console.log('user',user);
            user.tokens.push(token);
            await user.save();
        }
        catch(err){
            throw new ApplicationError("not able to store token in database",500);
        }


    }
    async deleteTokenFromDb(userId,token){
        const user=await userDbModel.findById(userId);
        const tokenIndex=user.tokens.findIndex((t)=>t===token);
        user.tokens.splice(tokenIndex,1);
        await user.save();

    }

    async logOutOfAllDevice(userId){
       try{
        console.log('userid',userId);
        const user=await userDbModel.findById(userId);
        console.log("user....",user);
        user.tokens=[];
        await user.save();
       }
       catch(error){
        console.log(error);
        throw new ApplicationError("not able to delete all tokens from database",500);
       }

    }
    async resetPassword(hashedpassword,userId){
        try{
            const user=await userDbModel.findById(userId);
            if(!user){
                return{success:false};
            }
            user.password=hashedpassword;
            const updatedUser=await user.save();
            return {success:true,message:"password reset done successfully",user:updatedUser};
        }
        catch(error){
            throw new ApplicationError("failed to reset new password",400);
        }
    }

    async getUserDetailById(id){
        try{
            const user=await userDbModel.findById(id).select({password:0,tokens:0});
            return user;

        }
        catch(error){
            throw new ApplicationError("not a valid user id.",400);
        }
    }

    async getAllUserInfo(){
        try{
            const user=await userDbModel.find().select({password:0,tokens:0});
            return user;

        }
        catch(error){
            throw new ApplicationError("error while fetching all user details!!!",400);
        }
    }

    async updatedUserById(id,name,email,gender,phone){
        try{
            const user=await userDbModel.findById(id);
            if(name){
                user.name=name;
            }
            if(email){
                user.email=email
            }
            if(gender){
                user.gender=gender
            }
            if(phone){
                user.phone=phone;
            }
            await user.save();
            return {success:true,message:"user details updated successfully!!!"}

        }
        catch(error){
            throw new ApplicationError("error while updating  user details!!!",400);
        }

    }

    
}