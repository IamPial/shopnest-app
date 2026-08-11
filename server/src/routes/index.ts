import { Router } from "express";
import products from '../services/products'
import category from "../services/categories"


const router = Router()


//for products
router.use('/products', products)



//for categories
router.use('/categories', category)


export default router