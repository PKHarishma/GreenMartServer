import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
export const createOrder=async(req,res)=>{
   try{
      const userId=req.userId;
      const {items,address}=req.body;
      if(!address ||!items|| !items.length){
        return res.json({success:false,message:"Address and items are required"})
      }
      let amount = 0;

for (const item of items) {
    const product = await Product.findById(item.product);

    if (!product) {
        return res.json({
            success: false,
            message: "Product not found"
        });
    }

    amount += product.offerPrice * item.quantity;
}
      const order=await Order.create({
        userId,
        items,
        amount,
        address,
        paymentMethod:'COD',
        isPaid:false

      })
      return res.json({success:true,message:"Order created successfully"})
   }catch(error){
     res.json({success:false,message:error.message})
   }
}
export const getOrderByUserId=async(req,res)=>{
    try{
       const userId=req.userId;
       const order=await Order.find({userId}).populate("items.product").sort({createdAt:-1});
       return res.json({success:true,order});
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }

}
export const getAllOrder=async(req,res)=>{
    try{
       
       const order=await Order.find().populate("items.product").sort({createdAt:-1});
       return res.json({success:true, orders: order});
    }
    catch(error){
        return res.json({success:false,message:error.message})
    }

}

