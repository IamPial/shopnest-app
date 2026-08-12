"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//for verify the token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "token not found!"
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
exports.default = verifyToken;
//for checking the role
const isAdmin = (req, res, next) => {
    if (req.user?.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only."
        });
    }
    next();
};
exports.isAdmin = isAdmin;
