import CourseModel from "../model/course";





export default class CourseService{
  constructor(){}

  async handleGetAllCources(){
    try{
      const courses=await CourseModel.find({});
      return{
          status:"success",
          courses
        }
    }catch(errors){
      console.log(errors)
      return{
        status:"error",
        errors
      }
    }
  }

  async handleDeleteCourse(courceId:string){
    try{
      const courseDeleted=await CourseModel.deleteOne({_id:courceId});
      if(courseDeleted.deletedCount>0){
        return{
          status:"success",
          courseDeleted
        }
      }else{
        return{
          status:"fail",
          messageEn:"Course Not Found",
          messageAr:"الدوره ليس موجود"
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