import {  Router } from "express";

import { authorizationForTeacher } from "../meddileware/user";
import AnnouncementService from "../service/announcements";
import AnnouncementControler from "../controler/announcements";

const router=Router();

const announcementService= new AnnouncementService();
const snnouncementControler= new AnnouncementControler(announcementService)


router.get("/course",(req,res)=>snnouncementControler.getAllAnnouncements(req,res))
router.post("/course",(req,res)=>snnouncementControler.addAnnouncements(req,res))
router.patch("/course",(req,res)=>snnouncementControler.updateAnnouncements(req,res))
router.delete("/course",authorizationForTeacher,(req,res)=>snnouncementControler.deleteAnnouncements(req,res))












export default router;