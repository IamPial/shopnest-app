import { Router , Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router()


router.post("/", async(req:Request, res:Response)=>{
   const {userId, orderItem} = req.body

   if(!userId){
    return res.status(400).json({
        success:false,
        message:"user id not found!"
    })
   }

   //find user
   const user = await prisma.user.findUnique({where:{id:userId}})
   if(!user){
    return res.status(404).json({
        success:false,
        message:"User not found"
    })
   }


})