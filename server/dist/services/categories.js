import { Router } from "express";
import prisma from "../lib/prisma";
const router = Router();
router.post('/', async (req, res) => {
    try {
        const categoriesData = req.body;
        const data = await prisma.category.create({ data: categoriesData });
        res.json({
            success: true,
            message: "category created successfully",
            data,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "failed to create category",
            data: error,
        });
    }
});
//for fetch categories
router.use('/', async (req, res) => {
    try {
        const data = await prisma.category.findMany();
        res.json({
            success: true,
            message: "Data fetched successfully",
            data,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "Data fetched failed",
            data: error
        });
    }
});
export default router;
