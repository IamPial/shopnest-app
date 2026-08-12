import jwt from "jsonwebtoken";
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
        const decode = jwt.verify(token, process.env.JWT_SECRET);
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
export default verifyToken;
//for checking the role
export const isAdmin = (req, res, next) => {
    if (req.user?.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only."
        });
    }
    next();
};
