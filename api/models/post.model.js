import mongoose from "mongoose";

const createSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true,
    },
    content:{
        type:String,
        required:true,
    },
    image:{
       type:String,
       default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6SFmCYUxJLNH5uK2Ms0RyBnbvNWizvlwpYA&s' 
    },
    category:{
        type:String,
        default:'uncategorized'
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
},{timestamps:true})

const Post=mongoose.model('Post',createSchema);
export default Post;