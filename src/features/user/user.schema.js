import mongoose from 'mongoose';

export const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        match:[/.+\@.+../,"please enter  a valid email"],
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        // validate: {
        //   validator: function(v) {
        //     return /^(?:(?:\+?91|0)?[ -]?)?[6789]\d{9}$/.test(v);
        //   },
        //   message: props => `${props.value} is not a valid phone number!`
        // },
        maxlength:10,
        required: [true, 'User phone number required']
      },
      tokens:[String]

})