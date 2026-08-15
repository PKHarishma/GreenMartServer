import User from "../models/User.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const register=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
       if(!name || !email || !password){
        return res.status(400).json({message:"All fields are required"})
       }
       const existingUser=await User.findOne({email});
       if(existingUser){
         return res.json({message:"User already exist"})
       }
       const hashedPassword=await bcrypt.hash(password,10);
       const user=await User.create({name,email,password:hashedPassword})
       const token=jwt.sign(
        {id:user._id,},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
        
       )
       res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:process.env.NODE_ENV==="production"?"none":"strict",
        maxAge:24*60*60*1000,

       })
       res.json({success:true,name:user.name,email:user.email,message:"User registered successfully"})
    }catch(error){
        res.json({success:false,message:error.message})

    }
}
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const existingEmail=await User.findOne({email});
        if(!existingEmail){
            return res.json({success:false,message:"User not found"})
        }
        const isMatch = await bcrypt.compare(
            password,
            existingEmail.password
        );

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password"
            });
        }
        const token=jwt.sign(
            {id:existingEmail._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"none":"strict",
            maxAge:24*60*60*1000,
        })
        res.json({success:true,message:"User logged in successfully"})
    }
    catch(error){
        res.json({success:false,message:error.message});
    }
}
export const isAuthUser=async(req,res)=>{
    try{
        const user=await User.findById(req.userId).select("-password")  
        res.json({success:true,user})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}
export const logOut=async(req,res)=>{
   try{
     res.clearCookie("token",{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:process.env.NODE_ENV==="production"?"none":"strict",
     });
     res.json({success:true,message:"User logged out successfully"})

   }catch(error){
    res.json({success:false,message:error.message})
   }
}
