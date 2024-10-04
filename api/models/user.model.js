import { model, Schema } from "mongoose";

const UserSchema=new monogoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    }
})
const User=monogoose.model("User",UserSchema);
export default User;