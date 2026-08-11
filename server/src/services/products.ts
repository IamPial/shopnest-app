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


export default router