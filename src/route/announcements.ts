import {  Router } from "express";

import { authentication, authorizationForTeacher } from "../meddileware/user";
import AnnouncementService from "../service/announcements";
import AnnouncementControler from "../controler/announcements";

const router=Router();

const announcementService= new AnnouncementService();
const snnouncementControler= new AnnouncementControler(announcementService)


router.get("/announcement",authentication,(req,res)=>snnouncementControler.getAllAnnouncements(req,res))
router.post("/announcement",authorizationForTeacher,(req,res)=>snnouncementControler.addAnnouncements(req,res))
router.patch("/announcement",authorizationForTeacher,(req,res)=>snnouncementControler.updateAnnouncements(req,res))
router.delete("/announcement",authorizationForTeacher,(req,res)=>snnouncementControler.deleteAnnouncements(req,res))












export default router;