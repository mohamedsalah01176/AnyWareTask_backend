import { Types } from "mongoose";
import { IUserBody, JwtPayload } from "./user";
import { ICourse } from "./course";

export interface IAnswer {
  text: string;
  textEn?: string;
  textAr?: string;
  isCorrect: boolean;
}

export interface IQuestion {
  _id:string;
  question: string;
  questionEn?: string;
  questionAr?: string;
  answers: IAnswer[];
}

export interface IScore {
  student: JwtPayload; 
  score:number;
}

export interface IQuiz {
  course: ICourse; 
  questions: IQuestion[];
  teacherId: Types.ObjectId;
  numberStudent: number;
  scores: IScore[];
  createdAt: Date;
  updatedAt: Date;
}
