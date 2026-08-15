import express from 'express';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import connectCloudinary from './configs/Cloudinary.js';
import CartRoute from './routes/CartRoute.js';
import OrderRoute from './routes/OrderRoute.js';
import ProductRoute from './routes/ProductRouter.js';
import SellerRoute from './routes/SellerRoute.js';
import UserRoute from './routes/UserRoute.js';
import AddressRoute from './routes/AddressRoute.js';
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config();
await connectDB();
await connectCloudinary();
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175'
];
const port=process.env.PORT||4000;
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}));
app.use("/api/seller",SellerRoute);
app.use("/api/user",UserRoute);
app.use("/api/product",ProductRoute);
app.use("/api/address",AddressRoute);
app.use("/api/cart",CartRoute);
app.use("/api/order",OrderRoute);
app.get('/',(req,res)=>res.send("API is Working"));
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

