import { Router, type Request, type Response } from "express";
import bcrypt from "bcrypt"
import prisma from "../lib/prisma";

const router = Router()


//for register
router.post("/", async(req:Request, res:Response)=>{
    try{
      const {name, email, password } = req.body
      const isExistingUser = await prisma.user.findUnique({where:{email}})

      if(isExistingUser){
        return res.json({
            success:false,
            message:"User already exists with this email"
        })
      }

      const hashedPass = await bcrypt.hash(password, 10)
      const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPass
        }
      })

      const {password:_, ...userWithoutPass} = user
      res.json({
        success:true,
        message: "user registered successfully",
        data:userWithoutPass
      })
    }catch(error:any){
      
        res.status(500).json({
            success:false,
            message:"Registration Failed",
            data:error
        })
    }
})