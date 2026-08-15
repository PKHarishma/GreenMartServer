import express from 'express'
import {register,login,logOut,isAuthUser} from "../controllers/UserController.js";
import {AuthUser} from '../middlewares/AuthUser.js'
const UserRoute=express.Router();
UserRoute.post('/register',register)
UserRoute.post('/login',login);
UserRoute.get('/logOut',logOut);
UserRoute.get('/isAuth',AuthUser,isAuthUser);
export default UserRoute;