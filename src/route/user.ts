import {  Router } from "express";
import UserService from "../service/user";
import UserControler from "../controler/user";
import { authentication, authorizationForTeacher } from "../meddileware/user";

const router=Router();

const userService= new UserService();
const userControler= new UserControler(userService)


router.post("/register",(req,res)=>userControler.register(req,res))
router.post("/login",(req,res)=>userControler.login(req,res))
router.get("/user",authorizationForTeacher,(req,res)=>userControler.getAllUsers(req,res))
router.get("/user/:userId",authentication,(req,res)=>userControler.getSpecificUser(req,res))
router.get("/teachersId",(req,res)=>userControler.getAllTeacherId(req,res))
router.get("/studentForTeacher",authentication,(req,res)=>userControler.getAllStudentForTeacher(req,res))
router.delete("/user",authorizationForTeacher,(req,res)=>userControler.deleteUser(req,res))











export default router; 