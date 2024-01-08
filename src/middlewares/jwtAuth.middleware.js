import jwt from 'jsonwebtoken';

const jwtAuth=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return res.status(401).send("login to our app first!!");
    }
    try{
        const payload=jwt.verify(token,process.env.SECRET_KEY);
        req.userId=payload.userId;
        req.userEmail=payload.userEmail 
        //setting tokens to req object ..will be helpful during logout functionality
        req.userToken=token;
    }
    catch(err){
        return res.status(401).send("Unauthorised");
    }
    next();

}
export default jwtAuth;