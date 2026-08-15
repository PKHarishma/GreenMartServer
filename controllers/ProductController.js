import Product from '../models/Product.js';
import {v2 as cloudinary} from 'cloudinary';
//   /api/products/addProduct
export const addProduct=async(req,res)=>{
  try{
    const productData=JSON.parse(req.body.productData);
    const images=req.files;
    const imageUrl=await Promise.all(
        images.map(async(image)=>{
            let result=await cloudinary.uploader.upload(image.path,{resource_type:'image'})
            return result.secure_url;
        }))
        await Product.create({...productData,image:imageUrl})
        res.json({success:true,message:"product added successfully"})
  }catch(error){
     res.json({success:false,message:error.message})
  }
}
// /api/products/getProducts

export const productList=async(req,res)=>{
    try{
        let products=await Product.find({});
        res.json({success:true,products});
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

//  api/products/getproduct/:id
export const getProductById=async(req,res)=>{
    try{
        let {id}=req.params;
        let product=await Product.findById(id);
        res.json({success:true,product});
    }
    catch(error){
        res.json({success:false,message:error.message}) 
    }
}
 // /api/products/updateProduct/id
export const changeStock=async(req,res)=>{
    try{
         let {id,inStock}=req.body;
         await Product.findByIdAndUpdate(id,{inStock});
         res.json({success:true,message:"product stock updated successfully"})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}