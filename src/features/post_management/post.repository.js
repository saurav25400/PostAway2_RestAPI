
import mongoose from "mongoose";
import { postSchema } from "./post.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const postModel=mongoose.model('Post',postSchema);

export class PostRepository{

    async createPost(userId,caption,image){
        try{
            const newPost=new postModel({
                userId:userId,caption:caption,image:image
            });
            const createdPost=await newPost.save();
            console.log(createdPost);
           if(createdPost){
            return {success:true,message:"post created successfully."}

           }
           else{
            return {success:false}
           }
        }
        catch(err){
            throw new ApplicationError('post creation failed!!!',400);
        }
    }
    async updatePost(postId,caption,image){
        try{
            const posts=await postModel.findById(postId);
            if(!posts){
                return {success:false}
            }
            posts.image=image;
            posts.caption=caption;
            const res=await posts.save();
            if(res){
                return {success:true,message:"post updated successfully"}
            }
            else{
                return {success:false}
            }

        }
        catch(err){
            new ApplicationError('post updation failed!!!',400);
        }
    }
    async deletePost(postId){
        try{
            const posts=await postModel.findById(postId);
            if(!posts){
                return {success:false}
            }
            else{
                const deletedObject=await postModel.deleteOne({_id:new Object(postId)});
                if(deletedObject.deletedCount>0){
                    return {success:true,message:"post deleted successfully!!!"}
                }
            }

        }
        catch(err){
            new ApplicationError('post deletion failed!!!',400);
        }
    }
    async getAllPost(){
        try{
            const allPost=await postModel.find();
            return {success:true,data:allPost};

        }
        catch(err){
            new ApplicationError('failed to get all posts',400);
        }
    }
    async getSinglePostById(postId){
        try{
            const posts=await postModel.findById(postId);
            if(!posts){
                return {success:false};
            }
            else{
                return {success:true,data:posts}
            }

        }
        catch(err){
            new ApplicationError('failed to get single post,400');
        }
    }
    async allSpecificUserPost(userId){
        try{
            const userSpecificPost=await postModel.find({userId:new Object(userId)});
            console.log(userSpecificPost,'userpost');
            if(!userSpecificPost){
                return  {success:false}
            }
            else{
                return {success:true,data:userSpecificPost}
            }

        }
        catch(err){
            new ApplicationError('post retrieval for  single user failed!!!!')
        }
    }
}