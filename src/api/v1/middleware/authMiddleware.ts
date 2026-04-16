import { Request, Response, NextFunction } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import { auth } from "../../../config/firebaseConfig";

export interface AuthenticatedRequest extends Request {
    user?: DecodedIdToken;
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
                message: "Unauthorized: Missing token",
            });
            return;
        }

         req.user = {
            uid: "test-user",
            role: "admin",
        } as any;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized: Invalid token",
        });
    }
};