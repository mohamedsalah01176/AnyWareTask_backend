import {  Router } from "express";
import { authorizationForTeacher } from "../meddileware/user";
import QuizService from "../service/quize";
import QuizControler from "../controler/quize";

const router=Router();

const quizService= new QuizService();
const quizControler= new QuizControler(quizService)


router.get("/quiz",authorizationForTeacher,(req,res)=>quizControler.getAllQuiz(req,res))
router.post("/quiz",authorizationForTeacher,(req,res)=>quizControler.addQuiz(req,res))
router.post("/quiz/:quizId",authorizationForTeacher,(req,res)=>quizControler.submitQuiz(req,res))
router.patch("/quiz/:quizId",(req,res)=>quizControler.updateQuize(req,res))
router.delete("/quiz/:quizId",authorizationForTeacher,(req,res)=>quizControler.deleteCourse(req,res))
router.get("/submitQuiz",authorizationForTeacher,(req,res)=>quizControler.getAllSubmitedQuiz(req,res))












export default router;