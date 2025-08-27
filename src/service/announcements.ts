import { IAnnouncement } from "../interface/Announcement";
import AnnouncementModel from "../model/announcements";
import { translateToAr } from "../util/Announcements/translateToAr";
import { translateToEn } from "../util/Announcements/translateToEn";
import { announcementBodySchema } from "../util/yapSchema";





export default class AnnouncementService{
  constructor(){}

  async handleGetAllAnnouncements(){
    try{
      const announcements=await AnnouncementModel.find({});
      return{
          status:"success",
          announcements
        }
    }catch(errors){
      console.log(errors)
      return{
        status:"error",
        errors
      }
    }
  }

  async handleAddAnnouncement(body: IAnnouncement, lang: string) {
    try {
      let translateBody;

      if (lang === "ar") {
        translateBody = await translateToEn(body);
      } else {
        translateBody = await translateToAr(body);
      }

      const newAnnouncement = new AnnouncementModel(translateBody);
      newAnnouncement.save();
      return {
        status: "success",
        announcement: newAnnouncement,
      };
    } catch (errors) {
      console.log(errors);
      return {
        status: "error",
        errors,
      };
    }
  }

  async handleUpdateAnnouncement(announcementId: string, body:IAnnouncement,lang:string) {
    try {
      await announcementBodySchema.validate(body);
      let translateBody;
        if (lang === "ar") {
          translateBody = await translateToEn(body);
        } else {
          translateBody = await translateToAr(body);
        }
      const updatedAnnouncement = await AnnouncementModel.findByIdAndUpdate(
        announcementId,
        translateBody,
        { new: true }
      );

      if (updatedAnnouncement) {
        return {
          status: "success",
          updatedAnnouncement,
        };
      } else {
        return {
          status: "fail",
          messageEn: "Announcement Not Found",
          messageAr: "الاعلان ليس موجود",
        };
      }
    } catch (errors) {
      console.log(errors);
      return {
        status: "error",
        errors,
      };
    }
  }

  async handleDeleteAnnouncements(announcementId:string){
    try{
      const announcementDeleted=await AnnouncementModel.deleteOne({_id:announcementId});
      if(announcementDeleted.deletedCount>0){
        return{
          status:"success",
          announcementDeleted
        }
      }else{
        return{
          status:"fail",
          messageEn:"Announcement Not Found",
          messageAr:"الاعلان ليس موجود"
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