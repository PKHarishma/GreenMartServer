import { createOrder,getOrderByUserId,getAllOrder} from "../controllers/OrderController.js";
import express from 'express'
import { AuthUser } from "../middlewares/AuthUser.js";
import {AuthSeller} from "../middlewares/AuthSeller.js"

const OrderRoute=express.Router();
OrderRoute.post("/cod",AuthUser,createOrder);
OrderRoute.get("/getOrderByUserId",AuthUser,getOrderByUserId);
OrderRoute.get("/getAllOrder",AuthSeller,getAllOrder);
export default OrderRoute;
