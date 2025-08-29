import { Request, Response } from "express";
import { ReponseStatues } from "../util/ResponseStatus";
import QuizService from "../service/quize";
import { IUserBody, JwtPayload } from "../interface/user";






export default class QuizControler{
  constructor(private quizService:QuizService){
  }

  async getAllQuiz(req:Request,res:Response){
    let responseServer=await this.quizService.handleGetAllQuizzes();
    ReponseStatues(responseServer,res)
  }
  async getSpecificQuiz(req:Request,res:Response){
    const quizId=req.params.quizId
    let responseServer=await this.quizService.handleGetSpecificQuizz(quizId);
    ReponseStatues(responseServer,res)
  }
  async getAllSubmitedQuiz(req:Request,res:Response){
    let responseServer=await this.quizService.handleGetAllSubmitedQuizzes();
    ReponseStatues(responseServer,res)
  }

  async addQuiz(req:Request,res:Response){
    const body=req.body;
    const lang=req.query.lang as string;
    const user=req.user as IUserBody;
    let responseServer=await this.quizService.handleAddQuiz(body,lang,user);
    ReponseStatues(responseServer,res)
  }
  async submitQuiz(req:Request,res:Response){
    const quizId=req.params.quizId;
    const studentAnswers=req.body;
    const student=req.user as JwtPayload;
    let responseServer=await this.quizService.handleSubmitQuiz(quizId,student,studentAnswers);
    ReponseStatues(responseServer,res)
  }
  async updateQuize(req:Request,res:Response){
    const quizId=req.params.quizId;
    const body=req.body;
    const lang=req.query.lang as string;
    let responseServer=await this.quizService.handleUpdateQuiz(quizId,body,lang);
    ReponseStatues(responseServer,res)
  }
  
  async deleteCourse(req:Request,res:Response){
    const quizId=req.params.quizId
    let responseServer=await this.quizService.handleDeleteQuiz(quizId);
    ReponseStatues(responseServer,res)
  }
  async quizzesForUsers(req:Request,res:Response){
    const user=req.user as IUserBody;
    let responseServer=await this.quizService.handleAllQuizForUsers(user.teacherId as string);
    ReponseStatues(responseServer,res)
  }

}