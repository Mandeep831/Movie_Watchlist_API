import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "../../../config/firebaseConfig";
 
export interface AuthenticatedRequest extends Request {
    user?: DecodedIdToken & {
        role?: string;
    };
}
 
export const authenticate = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
 
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                status: "error",
                message: "Unauthorized: Missing token",
            });
            return;
        }
 
        const token = authHeader.split("Bearer ")[1].trim();
        const decodedToken = await auth.verifyIdToken(token);
 
        req.user = decodedToken as AuthenticatedRequest["user"];
        next();
    } catch (error) {
        res.status(401).json({
            status: "error",
            message: "Unauthorized: Invalid token",
        });
    }
};