import express from 'express';
import cookieParser from 'cookie-parser';
import swagger from 'swagger-ui-express';
import { ApplicationError } from './src/error-handler/applicationError.js';
import userRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwtAuth.middleware.js';
import otpRouter from './src/features/OTP/otp.routes.js';
import postRouter from './src/features/post_management/post.routes.js';
import commentRouter from './src/features/comment/comment.routes.js';
import likesRouter from './src/features/likes/like.routes.js';
import friendRouter from './src/features/friendship/friend.routes.js';
import swaggerDocument from './swagger.json' assert {type:'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';



const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use(cookieParser());

//logger middleware..
app.use(loggerMiddleware);

// *******************************-SWAGGER API DOCS URL AND SETUP **********

app.use("/api-docs",swagger.serve,swagger.setup(swaggerDocument));

// *************************************************************************



app.use("/api/users",userRouter);
app.use("/api/otp",jwtAuth,otpRouter)
app.use("/api/posts",jwtAuth,postRouter);
app.use("/api/comments",jwtAuth,commentRouter);
app.use("/api/likes",jwtAuth,likesRouter);
app.use("/api/friends",jwtAuth,friendRouter);

app.use((err, req, res, next) => {
    if(err instanceof ApplicationError){
        return res.status(err.statusCode).send(err.message);
    }
    console.log(err);
    res.status(500).send('Something went wrong from server.!')
  })

  //Handling 404 request..

  app.use((req,res)=>{
    res.status(404).send("Invalid Url..Path..Not found");
  })

export default app;