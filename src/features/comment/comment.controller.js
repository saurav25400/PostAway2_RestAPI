
import { CommentRepository } from "./comment.repository.js";
export class CommentController{
    constructor(){
        this.commentRepository=new CommentRepository();
    }

    async addComment(req,res,next){
        try{
            const postId=req.params.postId;
            const {comment}=req.body;
            const result=await this.commentRepository.addComment(postId,comment,req.userId);
            if(result.success){
                return res.status(201).send(result.message);
            }
            else{
                return res.status(400).send('failed to add comment');
            }


        }
        catch(err){
            console.log(err);
            next(err);
        }

    }
    async deleteComment(req,res,next){
        try{
            const commentId=req.params.commentId;
            const result=await this.commentRepository.deleteComment(commentId);
            if(result.success){
                return res.status(200).send(result.message)
            }
            else{
                return res.status(400).send('failed to delete post')
            }
        }
        catch(err){
            console.log(err);
            next(err)
        }
    }
    async updateComment(req,res,next){
        try{
            const commentId=req.params.commentId;
            const {comment}=req.body;
            const result=await this.commentRepository.updateComment(commentId,comment,req.userId);
            if(result.success){
                return res.status(200).send("comments updated successfully!!!");
            }
            else{
                return res.status(400).send("failed to update comments!!!");
            }
        }
        catch(err){
            console.log(err);
            next(err);
        }

    }
    async getCommentForSpecificPost(req,res,next){
        try{
            const postId=req.params.postId;
            const result=await this.commentRepository.getCommentForSpecificPost(postId);
            if(result.success){
                return res.status(200).send(result.data);
            }
            else{
                return res.status(400).send('failed to fetch comments for specific posts!!');
            }


        }
        catch(err){
            console.log(err);
            next(err);

        }
    }
}