
import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
const commentModel=mongoose.model('Comment',commentSchema);
export class CommentRepository{
    constructor(){}

    async addComment(postId,comment,userId){
        try{
            const existingComment = await commentModel.findOne({postId:new Object(postId)});
        if (existingComment) {
            existingComment.userComments.push({ comment, userId });
            await existingComment.save();
            console.log("hello");
            return { success: true, message: 'Your comment has been added successfully' };
        } else {
            const newComment = new commentModel({
                postId, 
                userComments: [{ comment, userId }]
            });
            const addedComment = await newComment.save();
            return addedComment 
                ? { success: true, message: 'Your comment has been added successfully' }
                : { success: false, message: 'Failed to add comment' };
        }


        }
        catch(err){
            throw new ApplicationError('failed to add comment to post',400);
        }
    }
    async deleteComment(commentId){
        try{
            const isCommentExist=await commentModel.findById(commentId);
            if(!isCommentExist){
                return {success:false}
            }
            const deleteObject=await commentModel.deleteOne({_id:new Object(commentId)});
            if(deleteObject.deletedCount>0){
                return {success:true,message:"comments deleted successfully!!!"}
            }
            else{
                return {success:false}
            }

        }
        catch(err){
            throw new ApplicationError('failed to delete comments',400);
        }
    }
    async updateComment(commentId,comment,userId){
        try{
            const isCommentExist=await commentModel.findOne({_id:new Object(commentId)});
            // console.log(isCommentExist,'exist');
            if(!isCommentExist){
                return {success:false}
            }
            const commentArray=isCommentExist.userComments;
            const commentObject=commentArray.find((i)=>i.userId==userId);
            if(commentObject){
                commentObject.comment=comment
                await isCommentExist.save();
                return {success:true}
            }
            else{
                return {success:false};
            }


        }
        catch(err){
            console.log(err);
            throw new ApplicationError('failed to update comment',400);

        }
    }
    async getCommentForSpecificPost(postId){
        try{
            const comments=await commentModel.findOne({postId:new Object(postId)});
            if(!comments){
                return {success:false}
            }
            else{
                return {success:true,data:comments}
            }

        }
        catch(err){

        }
    }

}