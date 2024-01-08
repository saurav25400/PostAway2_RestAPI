import express from 'express';
import { CommentController } from './comment.controller.js';

const commentRouter=express.Router();


const commentController=new CommentController();
commentRouter.post("/:postId",(req,res,next)=>{
commentController.addComment(req,res,next);
})

commentRouter.delete("/delete/:commentId",(req,res,next)=>{
    commentController.deleteComment(req,res,next);
})
commentRouter.put("/update/:commentId",(req,res,next)=>{
    commentController.updateComment(req,res,next);
})
commentRouter.get("/get/:postId",(req,res,next)=>{
    commentController.getCommentForSpecificPost(req,res,next);
})





export default commentRouter;