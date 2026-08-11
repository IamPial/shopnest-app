import { Router, type Request , type Response } from "express";
import prisma from "../lib/prisma";

const router = Router()


//for create products data
router.post('/', async(req:Request, res:Response)=>{
   try{
     const productData = req.body
    const createData = await prisma.products.create({data:productData})
    res.json({
        success:true,
        message:"Product Added Successfully",
        data:createData
    })
   }catch(error:any){

    res.json({
        success:false,
        message:"data not created",
        data:error
    })
   }
})



//for read products data 
router.get("/", async(req:Request, res:Response)=>{
    try{
        const data = await prisma.products.findMany()
        res.json({
            success:true,
            message:"Data fetching successfully",
            data,
        })
    }catch(error:any){
        res.json({
            success:false,
            message:"Error fetching data",
            data:error
        })
    }
})



export default router