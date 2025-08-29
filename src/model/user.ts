import mongoose from "mongoose";
import { IUser } from "../interface/user";


export const UserSchema=new mongoose.Schema({
  name:{
    type:String,
    minlength:3,
    required: true,
  },
  teacherId:{
    type:String,
  },
  role: {
    type: String,
    enum: ['teacher', 'student'], 
    default: 'student',
    required:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
  },
  password:{
    type:String,
    required:true,
    minlength: 8,
    match: [/(?=.*[a-zA-Z])(?=.*\d)/, 'Password must contain at least one letter and one number']
  },
},{
  timestamps: true
})

const UserModel= mongoose.model<IUser>('User',UserSchema);

export default UserModel;