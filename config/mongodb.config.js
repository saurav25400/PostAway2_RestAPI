import mongoose from 'mongoose';


// const url="mongodb://localhost:27017/postaway"
export const connectionUsingMongoose=async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/postaway",{
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        console.log("connected to mongodb successfully..");

    }
    catch(err){
        console.log("error occured while connecting to mongodb.");

    }

}
