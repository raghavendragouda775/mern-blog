import jwt from 'jsonwebtoken'
import { errorhandler } from './error.js'
export const verifyUser=(req,res,next)=>
{
    console.log("all cookies",req.cookies);
    const token=req.cookies.access_token;
    console.log("token",token);
    if(!token)
    {
        return next(errorhandler(401,'Unauthorized'));
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err)
        {
            return next(errorhandler(401,'Unauthorized'))
        }
        console.log(user);
        req.user=user;
        next();
    })
}
