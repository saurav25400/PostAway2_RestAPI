import mongoose from "mongoose";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { friendSchema } from "./friend.schema.js";
import { pendingrequestSchema } from "./friend.pendingRequest.Schema.js";

const pendingRequestModel=mongoose.model('PendingRequest',pendingrequestSchema);
const friendModel=mongoose.model('Friend',friendSchema);
export class FriendRepository{
    constructor(){}

    async toggleFriendShip(friendId,userId){
        try{
            const newFriendRequest=await friendModel.findOne({userId:new Object(userId)});
            if(!newFriendRequest){
                const addNewFriend=new friendModel({userId:new Object(userId),friends:[
                    friendId
                ]})
                addNewFriend.save();
             
                return {success:true,message:"toggle-friend successfully"}
            }
            else{
                const isfriensAlreadyExist=newFriendRequest.friends.findIndex((f)=>f==friendId);
                if(isfriensAlreadyExist===-1&&userId!==friendId){
                    newFriendRequest.friends.push(friendId);
                await newFriendRequest.save();
                return {success:true,message:"toggle-friend successfully"}
                }
                else{
                    return {success:false,message:"user is already your friend!!!"}
                }
            }


        }
        catch(error){
            throw new ApplicationError('failed to toggle friendship',400);
        }

    }

    async getUserFriends(userId){
        try{
            const friendDetail=await friendModel.findOne({userId:new Object(userId)});
            const friendDetails=await friendDetail.populate({path:'friends',select:'-tokens -password',model:'User'});
            if(friendDetails){
                return {success:true,data:friendDetails};
            }
            else{
                return {success:false}
            }

        }
        catch(error){
            throw new ApplicationError("failed to fetch details",400);
        }
    }






}