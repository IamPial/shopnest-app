"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../lib/prisma"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
//for create order
router.post('/', auth_1.default, async (req, res) => {
    try {
        const userId = req.user.id;
        const { items } = req.body;
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order must contain at least one item"
            });
        }
        const order = await prisma_1.default.$transaction(async (tx) => {
            let totalAmount = 0;
            const orderItemsData = [];
            for (const item of items) {
                const product = await tx.products.findUnique({
                    where: { id: item.productId }
                });
                if (!product) {
                    throw new Error(`Product not found: ${item.productId}`);
                }
                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for product: ${product.title}`);
                }
                const itemPrice = Number(product.price);
                totalAmount += itemPrice * item.quantity;
                orderItemsData.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: itemPrice
                });
                //reduce the stock
                await tx.products.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } }
                });
            }
            const createdOrder = await tx.orders.create({
                data: {
                    userId,
                    totalAmount,
                    orderItems: {
                        create: orderItemsData
                    }
                },
                include: {
                    orderItems: {
                        include: { product: true }
                    }
                }
            });
            return createdOrder;
        });
        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: order
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Order creation failed",
            data: error
        });
    }
});
//for get all orders
router.get('/', auth_1.default, async (req, res) => {
    try {
        const orders = await prisma_1.default.orders.findMany({
            where: { userId: req.user.id },
            include: {
                orderItems: {
                    include: { product: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json({
            success: true,
            data: orders
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            data: error
        });
    }
});
exports.default = router;
