import {logInSeller,logOutSeller,isAuthenticated} from "../controllers/SellerController.js";
import express from 'express'
import { AuthSeller } from "../middlewares/AuthSeller.js";

const SellerRoute=express.Router();
SellerRoute.post("/logIn",logInSeller);
SellerRoute.get("/logOut",logOutSeller);
SellerRoute.get("/is-auth",AuthSeller,isAuthenticated);
export default SellerRoute;