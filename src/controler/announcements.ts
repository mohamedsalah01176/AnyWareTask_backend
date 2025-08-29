import { Request, Response } from "express";
import { ReponseStatues } from "../util/ResponseStatus";
import AnnouncementService from "../service/announcements";
import { IUserBody, JwtPayload } from "../interface/user";






export default class AnnouncementControler{
  constructor(private announcementService:AnnouncementService){
  }

  async getAllAnnouncements(req:Request,res:Response){
    let responseServer=await this.announcementService.handleGetAllAnnouncements();
    ReponseStatues(responseServer,res)
  }
  
  async addAnnouncements(req:Request,res:Response){
    const lang=req.query.lang as string;
    const body=req.body;
    const user=req.user as JwtPayload
    let responseServer=await this.announcementService.handleAddAnnouncement({...body,createdBy:user._id},lang);
    ReponseStatues(responseServer,res)
  } 
  
  async updateAnnouncements(req:Request,res:Response){
    const announcementId=req.params.announcementId;
    const user=req.user as JwtPayload
    const lang=req.query.lang as string;
    const body=req.body;
    let responseServer=await this.announcementService.handleUpdateAnnouncement(announcementId,{...body,createdBy:user._id},lang);
    ReponseStatues(responseServer,res)
  } 
  
  async deleteAnnouncements(req:Request,res:Response){
    const announcementId=req.params.announcementId
    let responseServer=await this.announcementService.handleDeleteAnnouncements(announcementId);
    ReponseStatues(responseServer,res)
  }

}