import {  Router } from "express";
import CourseService from "../service/cource";
import CourseControler from "../controler/cource";
import { authentication, authorizationForTeacher } from "../meddileware/user";

const router=Router();

const courseService= new CourseService();
const courseControler= new CourseControler(courseService)


router.get("/course",authentication,(req,res)=>courseControler.getAllCourses(req,res))
router.delete("/course",authorizationForTeacher,(req,res)=>courseControler.deleteCourse(req,res))












export default router;