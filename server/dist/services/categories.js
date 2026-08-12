"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const categoriesData = req.body;
        const data = await prisma_1.default.category.create({ data: categoriesData });
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
        const data = await prisma_1.default.category.findMany();
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
exports.default = router;
