import { Router, type Request , type Response } from "express";
import prisma from "../lib/prisma";

const router = Router()

router.post('/', async(req:Request, res:Response)=>{
    try{
        const categoriesData = req.body;
        const data = await prisma.category.create({data:categoriesData})

        res.json({
        success:true,
        message:"category created successfully",
        data,
       })
    }catch(error:any){
 
    res.json({
        success:false,
        message:"failed to create category",
        data:error,
    })
    }
})

//for fetch categories
router.use('/', async(req:Request, res:Response)=>{
    try{
        const data = await prisma.category.findMany()
        res.json({
            success:true,
            message: "Data fetched successfully",
            data,

        })
    }catch(error:any){
        res.json({
            success:false,
            message: "Data fetched failed",
            data:error
        })
    }
})



export default router