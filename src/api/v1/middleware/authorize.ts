import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authenticate";
import { AuthorizationOptions } from "../models/authorizationOptions";
 
export const authorize = (opts: AuthorizationOptions) => {
    return (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): void => {
        const userRole = req.user?.role;
        const userUid = req.user?.uid;
        const routeId = req.params.id;
 
        if (opts.allowSameUser && routeId && userUid === routeId) {
            next();
            return;
        }
 
        if (!userRole) {
            res.status(403).json({
                status: "error",
                message: "Forbidden: No role found",
            });
            return;
        }
 
        if (!opts.hasRole.includes(userRole as "admin" | "user")) {
            res.status(403).json({
                status: "error",
                message: "Forbidden: You do not have permission to access this resource",
            });
            return;
        }
 
        next();
    };
};