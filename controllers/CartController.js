import User from "../models/User.js";
export const UpdateCart=async(req,res)=>{
    try{
        let userId=req.userId;
        let {cartItems}=req.body;
        await User.findByIdAndUpdate(userId,{cartItems});
        res.json({success:true,message:"cart updated successfully"})
    }
    catch(error){
        res.json({success:false,message:error.message})
    }
}

