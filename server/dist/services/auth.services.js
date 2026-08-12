"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = (0, express_1.Router)();
//for register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const isExistingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (isExistingUser) {
            return res.json({
                success: false,
                message: "User already exists with this email"
            });
        }
        const hashedPass = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPass
            }
        });
        const { password: _, ...userWithoutPass } = user;
        res.json({
            success: true,
            message: "user registered successfully",
            data: userWithoutPass
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Registration Failed",
            data: error
        });
    }
});
//for login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const options = {
            expiresIn: (process.env.JWT_EXPIRES_IN || "7d")
        };
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, options);
        res.json({
            success: true,
            message: "login successful",
            data: { token }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "login failed",
            data: error
        });
    }
});
exports.default = router;
