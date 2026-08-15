import {UpdateCart} from "../controllers/CartController.js"
import {AuthUser} from "../middlewares/AuthUser.js"
import express from 'express'
const CartRoute=express.Router();
CartRoute.post('/update',AuthUser,UpdateCart);
export default CartRoute;
