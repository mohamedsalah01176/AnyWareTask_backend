import { Request, Response } from "express";
import { ReponseStatues } from "../util/ResponseStatus";
import AnnouncementService from "../service/announcements";






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
    let responseServer=await this.announcementService.handleAddAnnouncement(body,lang);
    ReponseStatues(responseServer,res)
  } 
  
  async updateAnnouncements(req:Request,res:Response){
    const AnnouncementsId=req.params.AnnouncementsId;
    const lang=req.query.lang as string;
    const body=req.body;
    let responseServer=await this.announcementService.handleUpdateAnnouncement(AnnouncementsId,body,lang);
    ReponseStatues(responseServer,res)
  } 
  
  async deleteAnnouncements(req:Request,res:Response){
    const AnnouncementsId=req.params.AnnouncementsId
    let responseServer=await this.announcementService.handleDeleteAnnouncements(AnnouncementsId);
    ReponseStatues(responseServer,res)
  }

}