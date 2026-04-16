import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authMiddleware";

export const authorize = (...allowedRoles: string[]) => {
    return (
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): void => {
        const userRole = req.user?.role as string | undefined;

        if (!userRole || !allowedRoles.includes(userRole)) {
            res.status(403).json({
                message: "Forbidden: Access denied",
            });
            return;
        }

        next();
    };
};