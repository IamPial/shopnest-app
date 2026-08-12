"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = __importStar(require("../middlewares/auth"));
const router = (0, express_1.Router)();
//for create products data
router.post('/', auth_1.default, auth_1.isAdmin, async (req, res) => {
    try {
        const productData = req.body;
        const createData = await prisma_1.default.products.create({
            data: productData,
            include: {
                category: true
            },
        });
        res.json({
            success: true,
            message: "Product Added Successfully",
            data: createData
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "data not created",
            data: error
        });
    }
});
//for fetch products data 
router.get("/", async (req, res) => {
    try {
        const data = await prisma_1.default.products.findMany({
            include: {
                category: true
            }
        });
        res.json({
            success: true,
            message: "Data fetching successfully",
            data,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "Error fetching data",
            data: error
        });
    }
});
//for fetch products details
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await prisma_1.default.products.findUnique({
            where: { id }
        });
        res.json({
            success: true,
            message: "Fetching details successfully!",
            data,
        });
    }
    catch (error) {
        res.json({
            success: false,
            message: "Failed to fetching details",
            data: error
        });
    }
});
//for update data
router.patch("/:id", async (req, res) => {
    try {
        const id = req.params.id;
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
            const category = await prisma_1.default.category.findUnique({
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
        const updatedProduct = await prisma_1.default.products.update({
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
    }
    catch (error) {
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
router.delete("/:id", auth_1.default, auth_1.isAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await prisma_1.default.products.delete({
            where: { id }
        });
        res.json({
            success: true,
            message: "product deleted successfully!",
            data
        });
    }
    catch (error) {
        res.json({
            success: true,
            message: "product deleted failed",
            data: error
        });
    }
});
exports.default = router;
