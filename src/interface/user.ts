export interface IUserBody{
  _id:string,
  name:string,
  email:string,
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
}

export interface ILoginUser{
  emailOrPhone:string, 
  password:string
}



export interface JwtPayload {
    _id:string,
  name:string,
  email:string,
  role:'student' | 'teacher',
  createdAt:Date
} 