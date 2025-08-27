import { Request, Response } from "express";
import { ReponseStatues } from "../util/ResponseStatus";
import CourseService from "../service/cource";






export default class CourseControler{
  constructor(private courseService:CourseService){
  }

  async getAllCourses(req:Request,res:Response){
    let responseServer=await this.courseService.handleGetAllCources();
    ReponseStatues(responseServer,res)
  }
  
  async deleteCourse(req:Request,res:Response){
    const courseId=req.params.courseId
    let responseServer=await this.courseService.handleDeleteCourse(courseId);
    ReponseStatues(responseServer,res)
  }

}