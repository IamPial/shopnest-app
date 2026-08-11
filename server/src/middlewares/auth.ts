import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"


export interface AuthRequest extends Request{
    user?:any
}

//for verify the token
const verifyToken = (req:AuthRequest, res:Response, next:NextFunction)=>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success:false,
            message:"token not found!"
        })

    }

    const token = authHeader.split(" ")[1]

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET as string)
        req.user = decode
        next()
    }catch(error:any){
        return res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        })
    }
}

export default verifyToken


//for checking the role
export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "ADMIN") {
        return res.status(403).json({
            success: false,
            message: "Access denied. Admins only."
        });
    }
    next();
};