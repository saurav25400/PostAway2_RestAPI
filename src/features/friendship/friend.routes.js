import express from "express";
import { FriendController } from "./friend.controller.js";

const friendRouter=express.Router();

const friendController=new FriendController();
friendRouter.post("/toggle-friendship/:friendId",(req,res,next)=>{
friendController.toggleFriendShip(req,res,next);
})

friendRouter.get("/get-friends/:userId",(req,res,next)=>{
    friendController.getUsersFriend(req,res,next);
})





export default friendRouter;