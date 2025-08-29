export interface IUserBody{
  _id:string,
  name:string,
  email:string,
  teacherId?:string,
  password:string,
  role:'student' | 'teacher',
  createdAt:Date
}
export interface IUser{
  name:string,
  email:string,
  password:string,
  role:'student' | 'teacher',
  createdAt:Date
  teacherId?:string,
}

export interface ILoginUser{
  email:string, 
  password:string
}



export interface JwtPayload {
  _id:string,
  teacherId?:string,
  name:string,
  email:string,
  role:'student' | 'teacher',
  createdAt:Date
} 