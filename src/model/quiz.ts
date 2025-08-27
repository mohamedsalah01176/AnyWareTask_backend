import mongoose from "mongoose";
import { UserSchema } from "./user";
import { IQuiz } from "../interface/quiz";
import { CourseSchema } from "./course";

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Question is required"],
    minlength: [3, "Question must be at least 3 characters long"],
    maxlength: [500, "Question must not exceed 500 characters"],
  },
  questionEn: {
    type: String,
  },
  questionAr: {
    type: String,
  },
  answers: [
    {
      text: {
        type: String,
        required: [true, "Answer text is required"],
        minlength: [1, "Answer must not be empty"],
        maxlength: [200, "Answer must not exceed 200 characters"],
      },
      textEn: {
        type: String,
      },
      textAr: {
        type: String,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const QuizSchema = new mongoose.Schema(
  {
    course: {
      type: CourseSchema,
      required: [true, "Course information is required"],
    },
    questions: {
      type: [QuestionSchema],
      validate: {
        validator: function (val: any[]) {
          return val.length > 0;
        },
        message: "Quiz must contain at least one question",
      },
    },
    numberStudent: {
      type: Number,
      min: [0, "Number of students cannot be negative"],
      default: 0,
    },
    scores: [
      {
        student: {
          type: UserSchema,
          required: [true, "Student is required for score entry"],
        },
        score: {
          type: Number,
          required: [true, "Score is required"],
          min: [0, "Score cannot be less than 0"],
          max: [100, "Score cannot exceed 100"], 
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const QuizModel = mongoose.model<IQuiz>("Quiz", QuizSchema);

export default QuizModel;
