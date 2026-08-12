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


//for update data
router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    
    const updateData = req.body;

    // check the price
    if (updateData.price !== undefined && updateData.price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be positive",
      });
    }

    // check the stock
    if (updateData.stock !== undefined && updateData.stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock cannot be negative",
      });
    }

    // Verify category exists if categoryId is being updated
    if (updateData.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: updateData.categoryId },
      });

      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
    }

    // Update product in database
    const updatedProduct = await prisma.products.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
      },
    });

    // Return success response with updated product
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error: any) {
    // Handle not found error
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
});









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