

import { PostRepository } from "./post.repository.js";
export class PostController{
    constructor(){
        this.postRepository=new PostRepository();
    }

    async createPost(req,res,next){
        try{
            const {caption}=req.body;
            const image=req.file.filename;
            const userId=req.userId;
            console.log('caption',image);
            const result=await this.postRepository.createPost(userId,caption,image);
            if(result.success===true){
                return res.status(201).send(result.message);
            }
            else{
                return res.status(400).send('Post creation failed!!!');
            }

        }
        catch(err){
            console.log(err);
            next(err)
        }

    }
    async updatePost(req,res,next){
        try{
            const postId=req.params.postId;
            const {caption}=req.body;
            const image=req.file.filename;
            const result=await this.postRepository.updatePost(postId,caption,image);
            if(result.success){
                return res.status(201).send(result.message);
            }
            else{
                return res.status(400).send('post updation failed!!!');
            }

        }
        catch(err){
            console.log(err);
            next(err)
        }
    }
    async deletePost(req,res,next){
        try{
            const postId=req.params.postId;
            const result=await this.postRepository.deletePost(postId);
            if(result.success){
                return res.status(200).send(result.message);
            }
            else{
                return res.status(400).send("could not  able to delete post!!")
            }

        }
        catch(err){
            console.log(err);
            next(err)
        }
    }
    async getAllPost(req,res,next){
        try{
            const allPost=await this.postRepository.getAllPost();
            if(allPost.success==true){
                return res.status(200).send(allPost.data);
            }else{
                return res.status(400).send("failed to retrieve post")
            }

        }catch(err){
            console.log(err);
            next(err);
        }
    }
    async getSinglePostById(req,res,next){
        try{
            const postId=req.params.postId;
            const posts=await this.postRepository.getSinglePostById(postId);
            if(posts.success){
                return res.status(200).send(posts.data);
            }else{
                return res.status(400).send('failed to get post..check postId properly')
            }

        }
        catch(err){
            console.log(err);
            next(err);
        }
    }

    async getAllPostOfSpecificUser(req,res,next){
        try{
            const allSpecificUserPost=await this.postRepository.allSpecificUserPost(req.userId);
            console.log(allSpecificUserPost,'hello');
            if(allSpecificUserPost.success){
                return res.status(200).send(allSpecificUserPost.data);
            }
            else{
                return res.status(400).send('could not able to get posts!!!')
            }

        }
        catch(err){
            console.log(err);
            next(err);
        }
    }

}