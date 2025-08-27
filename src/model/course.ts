import mongoose from "mongoose";
import { ICourse } from "../interface/course";

export const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      minlength: [3, "Course title must be at least 3 characters long"],
      maxlength: [200, "Course title must not exceed 200 characters"],
    },
    titleEn: {
      type: String,
    },
    titleAr: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [2000, "Description must not exceed 2000 characters"],
    },
    descriptionEn: {
      type: String,
    },
    descriptionAr: {
      type: String,
    },
    numberQuiz: {
      type: Number,
      required: [true, "Number of quizzes is required"],
      min: [0, "Number of quizzes cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model<ICourse>("Course", CourseSchema);

export default CourseModel;
