"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = __importDefault(require("../services/products"));
const categories_1 = __importDefault(require("../services/categories"));
const users_1 = __importDefault(require("../services/users"));
const orders_1 = __importDefault(require("../services/orders"));
const auth_services_1 = __importDefault(require("../services/auth.services"));
const router = (0, express_1.Router)();
//for authentication
router.use("/auth", auth_services_1.default);
//for users
router.use("/users", users_1.default);
//for products
router.use('/products', products_1.default);
//for categories
router.use('/categories', categories_1.default);
//for orders
router.use("/orders", orders_1.default);
exports.default = router;
