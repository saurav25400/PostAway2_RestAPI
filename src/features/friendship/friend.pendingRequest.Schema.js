import mongoose from "mongoose";

export const pendingrequestSchema=new mongoose.Schema({
friendId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',

},
pendingRequest:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
]
})