import { Router, type Request, type Response } from "express";
import bcrypt from "bcrypt"
import jwt ,{type SignOptions}from 'jsonwebtoken'
import prisma from "../lib/prisma";

const router = Router()


//for register
router.post("/register", async(req:Request, res:Response)=>{
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


//for login
router.post('/login', async(req:Request, res:Response)=>{
    try{
        const {email, password} = req.body
        const user = await prisma.user.findUnique({where:{email}})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }
      
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({
                success:false,
                message:"Invalid email or password"
            })
        }


        const options: SignOptions = {
        expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"]
      };

        const token = jwt.sign(
            {id:user.id, email:user.email, role:user.role},
            process.env.JWT_SECRET as string,
             options
        ) 
        res.json({
            success:true,
            message:"login successful",
            data:{token}
        })

    }catch(error:any){
      res.status(500).json({
        success:false,
        message:"login failed",
        data: error
      })
    }
})

export default router