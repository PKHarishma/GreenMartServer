import mongoose from "mongoose";
const Order=new mongoose.Schema({
     userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true },
     items:[{
        product:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Product"},
        quantity:{type:Number,required:true},
     }],
     amount:{type:Number,required:true},
     address:{type:mongoose.Schema.Types.ObjectId,required:true},
     status:{type:String,default:"pending"},
     paymentMethod:{type:String,required:true,default:"COD"},
     isPaid:{type:Boolean,default:false},
},{timestamps:true})
const OrderModel=mongoose.models.Order||mongoose.model("Order",Order);
export default OrderModel;