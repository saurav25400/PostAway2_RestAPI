import { LikeRepository } from "./like.repository.js";
export class LikeControler{
    constructor(){
        this.likeRepository=new LikeRepository();
    }

    async toggleLikes(req,res,next){
        try{
            const postId=req.params.postId;
            const {likes}=req.body;
            const result=await this.likeRepository.toggleLikes(postId,likes,req.userId);
            if(result.success){
                return res.status(201).send('likes toggled successfully!!')
            }
            else{
                return res.status(400).send('operation failed!!!');
            }


        }
        catch(err){
            console.log(err);
            next(err);
        }
    }
    async getLikesForSpecificPost(req,res,next){
        try{
            const postId=req.params.postId;
            const likes=await this.likeRepository.getLikesForSpecificPost(postId);
            if(likes){
                return res.status(200).send(likes);
            }else{
                return res.status(400).send('failed to fetch likes for specific post!!')
            }

        }
        catch(error){
            next(error);
        }
    }
}