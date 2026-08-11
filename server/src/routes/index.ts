import { Router } from "express";
import products from '../services/products'
import category from "../services/categories"
import authRoutes from "../services/auth.services"


const router = Router()


//for users
router.use("/auth", authRoutes)

//for products
router.use('/products', products)



//for categories
router.use('/categories', category)


export default router