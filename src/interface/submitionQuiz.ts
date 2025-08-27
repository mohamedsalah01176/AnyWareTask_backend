import { IUser } from "./user"; 

export interface IQuestion {
  _id?: string;      
  text: string;
  textEn?: string;
  textAr?: string;
}

export interface IChosenAnswer {
  text: string;
  textEn: string;
  textAr: string;
  isCorrect: boolean;
}

export interface ICorrectAnswer {
  text: string;
  textEn: string;
  textAr: string;
}

export interface IStudentAnswer {
  question: IQuestion;         
  chosenAnswer: IChosenAnswer;     
  correctAnswer?: ICorrectAnswer;  
}

export interface ISubmission {
  _id?: string;
  student: IUser;                 
  answers: IStudentAnswer[];      
  score: number;                
  createdAt?: Date;
  updatedAt?: Date;
}
