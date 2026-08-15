import { addProduct,productList,getProductById,changeStock } from "../controllers/ProductController.js";
import express from "express"
import { AuthUser} from "../middlewares/AuthUser.js";
import { AuthSeller } from "../middlewares/AuthSeller.js";
import {storage} from "../configs/Multer.js"
const ProductRoute=express.Router();
ProductRoute.post("/addProduct",storage.array('images'),AuthSeller,addProduct);
ProductRoute.get("/productList",productList);
ProductRoute.get("/:id",getProductById);
ProductRoute.post("/stock",AuthSeller,changeStock);
export default ProductRoute;