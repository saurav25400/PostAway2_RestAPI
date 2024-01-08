import { FriendRepository } from "./friend.repository.js";

export class FriendController{

    constructor(){
        this.friendRepository=new FriendRepository();
    }

    async toggleFriendShip(req,res,next){
        try{
            const friendId=req.params.friendId;
            const result=await this.friendRepository.toggleFriendShip(friendId,req.userId);
            if(result.success){
                return res.status(200).send(result.message);
            }
            else{
                return res.status(400).send(result.message);
            }
        }
        catch(error){

            next(error);
        }
    }
    async getUsersFriend(req,res,next){
        try{
            const result=await this.friendRepository.getUserFriends(req.userId);
            if(result.success){
                return res.status(200).send(result.data);
            }else{
                return res.status(400).send("failed to fetch details!!")
            }
            

        }catch(error){
            next(error);
        }

        
    }
}