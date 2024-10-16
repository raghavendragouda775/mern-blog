


import User from "../models/user.model.js";
import { errorhandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test=(req,res)=>{
    res.json({message:"working crct"})
};

export const updateUser=async(req,res,next)=>
{
    console.log("req.user:", req.user); 
    console.log("req.params:", req.params);
  if(req.user.id!==req.params.id)
  {
    return next(errorhandler(403,'you are not allowed to Update'))
  }
  if(req.body.password)
  {
    if(req.body.password.length<6)
    {
        return next(errorhandler(400,'password must be at least 6 characters'))
    }
    req.body.password=bcryptjs.hashSync(req.body.password,10)
    
  }
  if(req.body.username)
  {
    if(req.body.username.length < 7 || req.body.username.lenght > 20)
    
    {
        return next(errorhandler(400,'Username must be between 7 and 20 characters '))
    }
    // if(req.body.username.includes(''))
    // {
    //     return next(errorhandler(400,'Username cannot contain spaces'))
    // }
    
    if(req.body.username!==req.body.username.toLowerCase())
    {
        return next(errorhandler(400,'Username must be lowercase'));
    }
    try{
        const UpdatedUser=await User.findByIdAndUpdate(req.params.id,
            {
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                profilepicture:req.body.profilepicture,
            },{new:true}
        )
        if (!UpdatedUser) {
            return next(errorhandler(404, 'User not found')); 
          }
        const {password,...rest}=UpdatedUser._doc;
        res.status(200).json(rest);

        }catch(error)
        {
            next(error);
        }
  }
}
export  const deleteUser=async (req,res,next)=>
{
  // only admin can delete and user should be authorized
  if(!req.user.isAdmin&&req.user.id!=req.params.userId)
  {
    return next(errorhandler(403,'You are not allowed to delete this user'))
  }
  try
  {
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json('User has been deleted');
  }catch(error)
  {
    next(error);
  }
}
 

export const signOut=(req,res,next)=>{
  try{
    res.clearCookie('access_token').status(200).json('User has been signed Out');
  }catch(error)
  {
    console.log(error);
  }

}
export const getUsers= async (req,res,next)=>{
  if(!req.user.isAdmin)
  {
    return next(403,'You are Not allowed to see all users')
  }
  try{
    const startIndex=parseInt(req.query.startIndex)||0;
    const limit=parseInt(req.query.limit)||9;
    const sortDirection=req.query.sort==='asc'?1:-1;
    const users=await User.find().sort({createdAt:sortDirection}).skip(startIndex).limit(limit);

    const usersWithoutPassword=users.map((user)=>
    {
       const {password ,...rest}=user._doc;
       return rest;
    })
    const totalusers=await User.countDocuments();
    const now=new Date();
    const monthAgo=new Date(
      now.getFullYear(),
      now.getMonth()-1,
      now.getDate()
    );
    const lastMonthUser=await User.countDocuments({
      createdAt:{$gte:monthAgo},
    })
    res.status(200).json(
      {
        users:usersWithoutPassword,
        totalusers,
        lastMonthUser,
      }
    )
    
  }catch(error)
  {
    next(error);
  }
}
export const getUser=async (req,res,next)=>{
  try{
    const user =await User.findById(req.params.userId)
    if(!user)
    {
      return next(errorhandler(404,'User not Found'));
    }
    const{password,...rest}=user._doc;
    res.status(200).json(rest);
    }catch(error)
    {
      next(error);
    }
}