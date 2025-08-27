import mongoose from "mongoose";
import { UserSchema } from "../model/user";
import { ISubmission } from "../interface/submitionQuiz";

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Question text is required"],
    minlength: [3, "Question must be at least 3 characters long"],
    maxlength: [500, "Question must not exceed 500 characters"],
  },
  textEn: {
    type: String,
  },
  textAr: {
    type: String,
  },
});

const SubmissionSchema = new mongoose.Schema(
  {
    student: {
      type: UserSchema,
      required: [true, "Student information is required"],
    },
    answers: {
      type: [
        {
          question: {
            type: QuestionSchema,
            required: [true, "Question is required in each answer"],
          },
          chosenAnswer: {
            text: {
              type: String,
              required: [true, "Chosen answer text is required"],
              minlength: [1, "Chosen answer must not be empty"],
              maxlength: [200, "Chosen answer must not exceed 200 characters"],
            },
            textEn: {
              type: String,
            },
            textAr: {
              type: String,
            },
            isCorrect: {
              type: Boolean,
              required: [true, "isCorrect flag is required for chosenAnswer"],
            },
          },
          correctAnswer: {
            text: {
              type: String,
              required: [true, "Correct answer text is required"],
            },
            textEn: {
              type: String,
            },
            textAr: {
              type: String,
            },
          },
        },
      ],
      validate: {
        validator: function (val: any[]) {
          return val.length > 0;
        },
        message: "Submission must contain at least one answered question",
      },
    },
    score: {
      type: Number,
      required: [true, "Score is required"],
      min: [0, "Score cannot be negative"],
      max: [100, "Score cannot exceed 100"],
    },
  },
  { timestamps: true }
);

const SubmissionModel = mongoose.model<ISubmission>(
  "Submission",
  SubmissionSchema
);

export default SubmissionModel;
