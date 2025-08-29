import { Request, Response } from "express";
import UserService from "../service/user";
import { ReponseStatues } from "../util/ResponseStatus";
import { IUserBody } from "../interface/user";






export default class UserControler{
  constructor(private userService:UserService){
  }

  async register(req:Request,res:Response){
    const body=req.body;
    let responseServer=await this.userService.handleRegister(body);
    ReponseStatues(responseServer,res)
  }
  
  async login(req:Request,res:Response){
    const body=req.body;
    let responseServer=await this.userService.handleLogin(body);
    ReponseStatues(responseServer,res)  
  }
  async getAllUsers(req:Request,res:Response){
    let responseServer=await this.userService.handleGetAllUsers();
    ReponseStatues(responseServer,res)  
  }
  
  async getSpecificUser(req:Request,res:Response){
    const userId=req.params.userId
    let responseServer=await this.userService.handleGetSpecificUser(userId);
    ReponseStatues(responseServer,res)  
  }

  async getAllTeacherId(req:Request,res:Response){
    let responseServer=await this.userService.handleGetAllTeachersId();
    ReponseStatues(responseServer,res)  
  }
  async getAllStudentForTeacher(req:Request,res:Response){
    const user=req.user as IUserBody;
    let responseServer=await this.userService.handleGetAllStudentForTeacher(user.teacherId as string);
    ReponseStatues(responseServer,res)  
  }

  async deleteUser(req:Request,res:Response){
    const userId=req.params.userId;
    let responseServer=await this.userService.handleDeleteUser(userId);
    ReponseStatues(responseServer,res)  
  }
}