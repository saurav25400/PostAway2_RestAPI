import express from 'express';
import jwtAuth from '../../middlewares/jwtAuth.middleware.js';
import { UserController } from './user.controller.js';
const userRouter=express.Router();

const userController=new UserController();
userRouter.post("/signup",(req,res,next)=>{
    userController.signUp(req,res,next);
})
userRouter.post("/signin",(req,res,next)=>{
    userController.signIn(req,res,next);
})
userRouter.get("/logout",jwtAuth,(req,res,next)=>{
    userController.logOut(req,res,next);
})
userRouter.get("/logout-all-devices",jwtAuth,(req,res,next)=>{
    userController.logOutOfAllDevices(req,res,next);
})

userRouter.get("/get-details/:userId",(req,res,next)=>{
    userController.getUserDetailById(req,res,next);
})

userRouter.get("/get-all-details",(req,res,next)=>{
    userController.allUserInfo(req,res,next)
})

userRouter.put("/update-details/:userId",(req,res,next)=>{
    userController.updateUserById(req,res,next);
})



export default userRouter;