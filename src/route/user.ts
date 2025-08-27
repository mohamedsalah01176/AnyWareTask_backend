import {  Router } from "express";
import UserService from "../service/user";
import UserControler from "../controler/user";

const router=Router();

const userService= new UserService();
const userControler= new UserControler(userService)


router.post("/register",(req,res)=>userControler.register(req,res))
router.post("/login",(req,res)=>userControler.login(req,res))
router.delete("/user",(req,res)=>userControler.deleteUser(req,res))











export default router;