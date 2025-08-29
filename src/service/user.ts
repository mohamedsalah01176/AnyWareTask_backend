import { ILoginUser, IUserBody } from "../interface/user";
import bcrypt from "bcrypt"
import UserModel from "../model/user";
import {  loginBodySchema, regiterBodySchema } from "../util/yapSchema";
import jwt from "jsonwebtoken";




let otpStore:{[key:string]:string}={};

export default class UserService{
  constructor(){}


  async handleRegister(body:IUserBody){
    try{
      const foundUser=await UserModel.findOne({email:body.email});
      if(foundUser){
        return{
          status:"fail",
          messageEn:"The Email Aready Registered",
          messageAr:"تم تسجيل الايميل من قبل",
        }
      }
      
      const validationBody=regiterBodySchema.validate(body,{abortEarly:false});
      let bcriptPassword=await bcrypt.hash((await validationBody).password as string ,parseInt(process.env.SALTPASSWORD as string));
      let newUser=new UserModel({...(await validationBody),password:bcriptPassword});
      await newUser.save();
      const payload = {
        _id: newUser._id,
        name:newUser.name,
        email: newUser.email,
        teacherId:newUser.teacherId,
        role: newUser.role,
        createdAt:newUser.createdAt
      };
      let token=  jwt.sign(payload,process.env.SECTERTOKENKEY as string,{expiresIn:"30d"});
      return{
        status:"success",
        messageEn:"user Created",
        messageAr:"تم انشاء المستخدم",
        token
      }
    }catch(errors){
      console.log(errors)
      return {
        status:"error",
        errors
      }
    }
  }

  async handleLogin(body:ILoginUser){
    if(!body){
      return{
        status:"fail",
        messageEn:"Email and Password are required",
        messageAr:"يجب ادجال الايميل وكلمه السر",
      }
    }
    try{
      let validateBody=await loginBodySchema.validate(body,{abortEarly:false});
      const foundUser=await UserModel.findOne({email:validateBody.email});
      console.log(foundUser)
      if(!foundUser){
        return{
          status:"fail",
          messageEn:"Email Not Registered",
          messageAr:"الايميل غير مسجل"
        }
      }
      let matchedPassword=await bcrypt.compare(validateBody.password,foundUser.password);
      const payload = {
        _id: foundUser._id,
        name:foundUser.name,
        email: foundUser.email,
        teacherId:foundUser.teacherId,
        role:foundUser.role,
        createdAt:foundUser.createdAt
      };
      let token=  jwt.sign(payload,process.env.SECTERTOKENKEY as string,{expiresIn:"30d"});
      console.log(validateBody.password);
      console.log(matchedPassword);
      if(matchedPassword){
        return{
          status:"success",
          messageEn:"Welcame in Our WebSite",
          messageAr:"مرحبا بك في موقعنا",
          token
        }
      }else{
        return{
          status:"error",
          messageEn:"Password is not correct",
          messageAr:"كلمه السر غير صحيحيه",
        }
      }
    }catch(errors){
      return{
        status:"error",
        errors
      }
    }
  }

  async handleGetSpecificUser(userId:string){
    try{
      let foundUser=await UserModel.findOne({_id:userId});
      if(!foundUser){
        return{
          status:"fail",
          messageEn:"User Not Found",
          messageAr:"المستخدم ليس موجود"
        }
      }
      return{
        status:"success",
        user:foundUser
      }
    }catch(errors){
      return{
        status:"error",
        errors
      }
    }
  }
  async handleGetAllUsers(){
    try{
      const users=await UserModel.find({});
      return{
          status:"success",
          users
        }
    }catch(errors){
      console.log(errors)
      return{
        status:"error",
        errors
      }
    }
  }
  async handleGetAllTeachersId(){
    try{
      const teacherId = await UserModel.find({ role: "teacher" }).select("teacherId -_id");
      return{
          status:"success",
          teacherId
        }
    }catch(errors){
      console.log(errors)
      return{
        status:"error",
        errors
      }
    }
  }
  async handleGetAllStudentForTeacher(teacherId:string){
    try{
      const usersId=await UserModel.find({role:"student",teacherId:teacherId});
      return{
          status:"success",
          usersId
        }
    }catch(errors){
      console.log(errors)
      return{
        status:"error",
        errors
      }
    }
  }
  async handleDeleteUser(userId:string){

    try{
      const userDeleted=await UserModel.deleteOne({_id:userId});
      if(userDeleted.deletedCount>0){
        return{
          status:"success",
          userDeleted
        }
      }else{
        return{
          status:"fail",
          messageEn:"User Not Found",
          messageAr:"المستخدم ليس موجود"
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