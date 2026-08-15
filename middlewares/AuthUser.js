import jwt from 'jsonwebtoken'
export const AuthUser=async(req,res,next)=>{
    try{
       const {token}=req.cookies;
       if(!token){
        return res.json({success:false,message:"User not authorized"})
       }
       const decodedToken=jwt.verify(token,process.env.JWT_SECRET);
       if(decodedToken){
        req.userId=decodedToken.id;
         console.log("USER ID:", req.userId);
        next();
       }
     
    }catch(error){
        res.json({success:false,message:error.message})
    }}