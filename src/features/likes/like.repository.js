import mongoose from "mongoose";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { likeSchema } from "./like.schema.js";

const likeModel=mongoose.model('Like',likeSchema);
export class LikeRepository{
    constructor(){}
    async toggleLikes(postId,likes,userId){
        try{
            if(postId===userId){
                return {success:false}
            }
            const isLikeExist=await likeModel.findOne({postId:new Object(postId)});
            if(!isLikeExist){
                const newLikes=new likeModel({postId:new Object(postId),users:[new Object(userId)],likes:likes});
                await newLikes.save();
                return {success:true}
            }
            else if(isLikeExist){
                const isUserExist=isLikeExist.users.find((u)=>u.userId==userId);
                // console.log(isUserExist,'userExist');
                if(isUserExist!=-1){
                    isLikeExist.likes=Number(isLikeExist.likes)+Number(likes);
                    await isLikeExist.save();
                    
                }
                else{
                    isLikeExist.users.push(new Object(userId));
                    isLikeExist.likes=Number(isLikeExist.likes)+Number(likes);
                    await isLikeExist.save();
                   
                }
                return {success:true}
                
            }

        }
        catch(err){
            throw new ApplicationError('failed to toggle likes on posts.',400);
        }
    }
    async getLikesForSpecificPost(postId){
        try{
            const allLike=await likeModel.findOne({postId:new Object(postId)});
            // console.log(allLike,'all');
            const allLikes=await allLike.populate({path:'users',select:'-tokens -password'})
            return allLikes;

        }
        catch(err){
            throw new ApplicationError("failed to retrieve  likes for each post",400);
        }
    }
}