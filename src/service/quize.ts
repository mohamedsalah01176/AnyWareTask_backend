import { IQuiz } from "../interface/quiz";
import { IUserBody, JwtPayload } from "../interface/user";
import CourseModel from "../model/course";
import QuizModel from "../model/quiz";
import SubmissionModel from "../model/submitionQuiz";
import { translateToAr } from "../util/quizzes/translateToAr";
import { translateToEn } from "../util/quizzes/translateToEn";





export default class QuizService{
  constructor(){}

  async handleGetAllQuizzes(){
    try{
      const quizzes=await QuizModel.find({});
      return{
          status:"success",
          quizzes
        }
    }catch(errors){
      console.log(errors)
      return{
        status:"error",
        errors
      }
    }
  }
  async handleGetSpecificQuizz(quizId:string){
    try{
      const quiz=await QuizModel.findOne({_id:quizId});
      return{
          status:"success",
          quiz
        }
    }catch(errors){
      console.log(errors)
      return{
        status:"error",
        errors
      }
    }
  }
  async handleGetAllSubmitedQuizzes(){
    try{
      const submisedQuiz=await SubmissionModel.find({});
      return{
          status:"success",
          submisedQuiz
        }
    }catch(errors){
      console.log(errors)
      return{
        status:"error",
        errors
      }
    }
  }

  async handleAddQuiz(body: IQuiz,lang:string,user:IUserBody) {
    console.log(user,"ddddddddd")
    try {
      let translateBody;
      if(lang=== "ar"){
        translateBody=await translateToEn(body)
      }else{
        translateBody=await translateToAr(body)
      }
      const foundCourse = await CourseModel.findOne({titleEn:translateBody.titleEn});
      if(foundCourse){
        foundCourse.updateOne({$inc:{numberQuiz:1}})
      }else{
        const newCourse = new CourseModel({
          title: translateBody.title,
          titleEn: translateBody.titleEn,
          titleAr: translateBody.titleAr || "", 
          description: translateBody.description,
          descriptionEn: translateBody.descriptionEn,
          descriptionAr: translateBody.descriptionAr || "", 
          numberQuiz: 1,
          teacherId: user.teacherId,
        });
        await newCourse.save();
      }
      const newQuiz = new QuizModel({...translateBody,teacherId:user.teacherId});
      await newQuiz.save();
      return {
        status: "success",
        quiz: newQuiz,
      };
    } catch (errors) {
      console.log(errors);
      return {
        status: "error",
        errors,
      };
    }
  }

  // chosenAnswer => it will be english
  async handleSubmitQuiz(quizId: string,student: JwtPayload,studentAnswers: { questionId: string; chosenAnswer: string }[]) {
  try {
    const quiz = await QuizModel.findById(quizId);

    if (!quiz) {
      return {
        status: "fail",
        messageEn: "Quiz Not Found",
        messageAr: "الاختبار ليس موجود",
      };
    }

    const existing = quiz.scores.find(
      (s: any) => s.student._id.toString() === student._id
    );

    if (existing) {
      return {
        status: "fail",
        messageEn: "You have already submitted this quiz.",
        messageAr: "لقد قمت بحل هذا الاختبار من قبل.",
      };
    }

    let score = 0;
    const answersForSubmission: any[] = [];

    for (const ans of studentAnswers) {
      const question = quiz.questions.find((q: any) => q._id.toString() === ans.questionId); 
      if (!question) continue;

      const chosen = question.answers.find((a: any) => a.textEn === ans.chosenAnswer);

      const correct = question.answers.find((a: any) => a.isCorrect);

      const isCorrect = chosen?.isCorrect || false;
      if (isCorrect) score++;

      answersForSubmission.push({
        question: {
          _id: question._id,
          text: question.question,
          textEn: question.questionEn,
          textAr: question.questionAr,
        },
        chosenAnswer: {
          text: chosen?.text || ans.chosenAnswer,
          textEn: chosen?.textEn || ans.chosenAnswer,   
          textAr: chosen?.textAr || ans.chosenAnswer, 
          isCorrect,
        },
        correctAnswer: {
          text: correct?.text || "",
          textEn: correct?.textEn || "",
          textAr: correct?.textAr || "",
        },
      });
    }
    
    const newSubmission = new SubmissionModel({
      student,
      answers: answersForSubmission,
      score,
    });
    await newSubmission.save();


    quiz.scores.push({
      student,
      score,
    });
    await quiz.save();

    return {
      status: "success",
      score,
      answers: answersForSubmission,
    };
  } catch (errors) {
    console.log(errors);
    return {
      status: "error",
      errors,
    };
  }
}


  async handleUpdateQuiz(quizId: string, body: any,lang:string) {
    try {
      let translateBody;
      if (lang === "ar") {
        translateBody = await translateToEn(body);
      } else {
        translateBody = await translateToAr(body);
      }

      const quizUpdated = await QuizModel.findByIdAndUpdate(quizId, translateBody, {
        new: true,
      });

      if (!quizUpdated) {
        return {
          status: "fail",
          messageEn: "Quiz Not Found",
          messageAr: "الاختبار ليس موجود",
        };
      }
      return {
        status: "success",
        quiz: quizUpdated,
      };
    } catch (errors) {
      console.log(errors);
      return {
        status: "error",
        errors,
      };
    }
  }

  async handleAllQuizForUsers(teacherId:string){
    try{
      console.log("ddddddd")
      const quizzes=await QuizModel.find({teacherId:teacherId});
      return{
        status:"success",
        quizzes
      }
    }catch(errors){
      console.log(errors)
      return{
        status:"error",
        errors
      }
    }
  }
  async handleDeleteQuiz(qiuzId:string){
    try{
      const quizeDeleted=await QuizModel.deleteOne({_id:qiuzId});
      if(quizeDeleted.deletedCount>0){
        return{
          status:"success",
          quizeDeleted
        }
      }else{
        return{
          status:"fail",
          messageEn:"Quiz Not Found",
          messageAr:"الاختبار ليس موجود"
        }
      }
    }catch(errors){
      console.log(errors)
      return{
        status:"error",
        errors
      }
    }
  }
}