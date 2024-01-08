import express from 'express';
import { LikeControler } from './like.controller.js';

const likesRouter=express.Router();

const likeController=new LikeControler();
likesRouter.post("/:postId",(req,res,next)=>{
likeController.toggleLikes(req,res,next);
})

likesRouter.get("/get/:postId",(req,res,next)=>{
    likeController.getLikesForSpecificPost(req,res,next);
})

export default likesRouter;