import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from "./user.repository.js";
import { UserModel } from "./user.model.js";

export class UserController{
    constructor(){
        this.userRepository=new UserRepository();
        console.log("usercontoller constructor is called");
    }

    async signUp(req,res,next){
        const {name,email,password,gender,phone,tokens}=req.body;
       const hashedPassword=await bcrypt.hash(password,12);
       const userModelData=new UserModel(name,email,hashedPassword,gender,phone,tokens);
        try{
            const signUpData=await this.userRepository.signUp(userModelData);
            if(signUpData){
                return res.status(201).send(signUpData);
            }
           else{
            return res.status(400).send("user is not registered.")
           }
        }
        catch(err){
            console.log(err);
           next(err);
           
        }


    }

    async signIn(req,res,next){
        const {email,password}=req.body;
        try{
            const user=await this.userRepository.findByEmail(req.body.email);
            if(!user){
                return res.status(400).send("Invalid Credentials!!!");
            }
            const result=bcrypt.compare(req.body.password,user.password);
            if(!result){
                return res.status(400).send("Invalid Credentials!!!");
            }
            else{
                const token=jwt.sign({userId:user._id,userEmail:user.email},process.env.SECRET_KEY,{ expiresIn: '3h' });
                // setting the user loggedin jwt token to the database
                await this.userRepository.setTokenToDb(user._id,token);
                //also storing token to cookie after successfull login.
                return res.cookie("access_token",token,{httpOnly:true,Secure:true}).status(200).json({message:"LoggedIn successfully!! ,and token is implicitly set in  cookie (you don't have to pass token explicitly in authorization header while calling other apis),call other apis to test it!!!"});
            }
        }
        catch(err){
            console.log(err);
            next(err);
        }

    
    }

    async logOut(req,res,next){
        try{
            await this.userRepository.deleteTokenFromDb(req.userId,req.userToken); 
            return res.clearCookie("access_token").status(200).json({message:"loggedOut successfully"}); 
        }
        catch(err){
            next(err);

        }
    }

    async logOutOfAllDevices(req,res,next){
        try{
            await this.userRepository.logOutOfAllDevice(req.userId);
            return res.clearCookie("access_token").status(200).json({message:"loggedOut successfully from all devices."}); 
        }
        catch(error){
            next(error);
        }
    }

    async getUserDetailById(req,res,next){
        try{

            const id=req.params.userId;
            const user=await this.userRepository.getUserDetailById(id);
            if(!user){
                return res.status(400).send("Not a valid user id!!!");
            }
            else{
                return res.status(200).json({userInfo:user})
            }
        }
        catch(error){
            next(error)

        }
    }
    async allUserInfo(req,res,next){
        try{
            const allUser=await this.userRepository.getAllUserInfo();
            if(!allUser){
                return res.status.send("unable to fetch all user info")
            }
            else{
                return res.status(200).send(allUser);
            }

        }
        catch(error){
            next(error);

        }
    }
    async updateUserById(req,res,next){
        try{
            const userId=req.params.userId;
            const {name,email,gender,phone}=req.body;
            const result=await this.userRepository.updatedUserById(userId,name,email,gender,phone);
            if(result.success){
                return res.status(200).send(result.message);
            }
            else{
                return res.status(400).send("updation failed!!!");
            }

        }
        catch(error){
            next(error)
        }
    }
   
}