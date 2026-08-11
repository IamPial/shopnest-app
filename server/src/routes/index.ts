import { Router } from "express";
import products from '../services/products'
import category from "../services/categories"
import users from "../services/users"
import authRoutes from "../services/auth.services"


const router = Router()





//for authentication
router.use("/auth", authRoutes)

//for users
router.use("/users", users)


//for products
router.use('/products', products)



//for categories
router.use('/categories', category)


export default router