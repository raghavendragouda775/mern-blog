
import User from "../models/user.model.js";
import { errorhandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import bcryptjs from "bcryptjs";


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password || username === "" || email === "" || password === "") {
    return next(errorhandler(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username) {
        return next(errorhandler(400, "Username already exists"));
      }
      if (existingUser.email === email) {
        return next(errorhandler(400, "Email already exists"));
      }
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({ message: "SignUp Successfully" });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
      return next(errorhandler(400, "All fields are required"));
  }
  try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
          return next(errorhandler(404, "User Not Found"));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
          return next(errorhandler(404, "Incorrect Password"));
      }
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      return res.status(200).cookie("access_token", token, {
          httpOnly: true,
      }).json({ 
          message: "Login Successful",
          user: {
              _id: validUser._id,
              username: validUser.username,
              email: validUser.email,
              profilepicture: validUser.profilepicture,
          } 
      });
  } catch (error) {
      next(error);
  }
};

export const google=async(req,res,next)=>{
            const {email,name,googlePhotoUrl}=req.body;
            try{
                const user=await User.findOne({email})
                if(user)
                {
                    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
                    const {password,...rest}=user._doc;
                    res.status(200).cookie('access_token',token,{
                        httpOnly:true,
                    }).json(rest);
                }
                else{
                    const generatedpassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
                    const hashedPassword=bcryptjs.hashSync(generatedpassword,10)
                    const newUser= new User({
                        username:name.toLowerCase().split(' ').join(' ')+Math.random().toString(9).slice(-4),
                        email,
                        password:hashedPassword,
                        profilepicture:googlePhotoUrl,

                        
                    
                    })
                    await newUser.save();
                    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET)
                    const {password,...rest}=newUser._doc;
                    res.status(200).cookie('access_token',token,{
                        httpOnly:true,
                    }).json(rest);
                }
            }catch(error)
            {
              next(error);  
            }

}