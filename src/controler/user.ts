import { Request, Response } from "express";
import UserService from "../service/user";
import { ReponseStatues } from "../util/ResponseStatus";






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

  async deleteUser(req:Request,res:Response){
    const userId=req.params.userId;
    let responseServer=await this.userService.handleDeleteUser(userId);
    ReponseStatues(responseServer,res)  
  }
}