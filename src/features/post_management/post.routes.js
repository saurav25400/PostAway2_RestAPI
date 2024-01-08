import express from 'express';
import { PostController } from './post.controller.js';
import { upload } from '../../middlewares/fileUpload.middleware.js';

const postRouter=express.Router();

const postController=new PostController();

postRouter.post("/create-post",upload.single('image'),(req,res,next)=>{

    postController.createPost(req,res,next);
})

postRouter.put("/update/:postId",upload.single('image'),(req,res,next)=>{
postController.updatePost(req,res,next);
})
postRouter.delete("/:postId",(req,res,next)=>{
    postController.deletePost(req,res,next);
})
postRouter.get("/all",(req,res,next)=>{
    postController.getAllPost(req,res,next)
})
postRouter.get("/get/:postId",(req,res,next)=>{
    postController.getSinglePostById(req,res,next);
})
postRouter.get("/get-all-by-userId",(req,res,next)=>{
    postController.getAllPostOfSpecificUser(req,res,next);
})

export default  postRouter;