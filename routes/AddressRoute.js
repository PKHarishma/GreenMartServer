import { addAddress,getAddress } from "../controllers/AddressController.js";
import express from 'express';
import { AuthUser } from "../middlewares/AuthUser.js";
const AddressRoute=express.Router();
AddressRoute.post("/add",AuthUser,addAddress);
AddressRoute.get("/get",AuthUser,getAddress)
export default AddressRoute;