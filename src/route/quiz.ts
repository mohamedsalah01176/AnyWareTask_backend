import {  Router } from "express";
import { authentication, authorizationForTeacher } from "../meddileware/user";
import QuizService from "../service/quize";
import QuizControler from "../controler/quize";

const router=Router();

const quizService= new QuizService();
const quizControler= new QuizControler(quizService)


router.get("/quiz",authentication,(req,res)=>quizControler.getAllQuiz(req,res))
router.post("/quiz",authorizationForTeacher,(req,res)=>quizControler.addQuiz(req,res))
router.get("/quiz/:quizId",authentication,(req,res)=>quizControler.getSpecificQuiz(req,res))
router.post("/quiz/:quizId",authorizationForTeacher,(req,res)=>quizControler.submitQuiz(req,res))
router.patch("/quiz/:quizId",authentication,(req,res)=>quizControler.updateQuize(req,res))
router.delete("/quiz/:quizId",authorizationForTeacher,(req,res)=>quizControler.deleteCourse(req,res))
router.get("/submitQuiz",authorizationForTeacher,(req,res)=>quizControler.getAllSubmitedQuiz(req,res))
router.get("/quizzesForUser",authentication,(req,res)=>quizControler.quizzesForUsers(req,res))












export default router;