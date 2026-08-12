import { Router } from "express";
import prisma from "../lib/prisma";
import verifyToken, { isAdmin } from "../middlewares/auth";
const router = Router();
//for admin profile
router.get('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true, createdAt: true }
        });
        res.json({ success: true, data: users });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch users", data: error });
    }
});
//for just my own profile
router.get('/myself', verifyToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, name: true, email: true, role: true }
        });
        res.json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch profile", data: error });
    }
});
export default router;
