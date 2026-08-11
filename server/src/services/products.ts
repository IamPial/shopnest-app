import { Router, type Request , type Response } from "express";
import prisma from "../lib/prisma";
import verifyToken, { isAdmin } from "../middlewares/auth";

const router = Router()


//for create products data
router.post('/', verifyToken, isAdmin, async(req:Request, res:Response)=>{
   try{
     const productData = req.body
    const createData = await prisma.products.create({
        data:productData,
        include:{
            category:true
        },
    })
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



//for fetch products data 
router.get("/", async(req:Request, res:Response)=>{
    try{
        const data = await prisma.products.findMany({
            include:{
                category:true
            }
        })
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


//for fetch products details
router.get("/:id", async(req:Request, res:Response)=>{
   try{
     const id = req.params.id as string
     const data = await prisma.products.findUnique({
     where:{id}
     })
     res.json({
     success:true,
     message:"Fetching details successfully!",
     data,
   })
   }catch(error:any){
    res.json({
        success:false,
        message:"Failed to fetching details",
        data:error
    })
   }
})


//for delete products data
router.delete("/:id", verifyToken, isAdmin, async(req:Request, res:Response)=>{
    try{
        const id = req.params.id as string
        const data = await prisma.products.delete({
        where:{id}
    })
    res.json({
        success:true,
        message:"product deleted successfully!",
        data
    })
    }catch(error:any){
        res.json({
            success:true,
            message:"product deleted failed",
            data:error
        })
    }
})



export default router