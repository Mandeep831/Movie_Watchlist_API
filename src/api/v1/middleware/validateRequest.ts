import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
 
interface ValidationSchema {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}
 
export const validateRequest = (schema: ValidationSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schema.params) {
                const { error } = schema.params.validate(req.params);
 
                if (error) {
                    return res.status(400).json({
                        message: error.details[0].message,
                    });
                }
            }
 
            if (schema.body) {
                const { error } = schema.body.validate(req.body);
 
                if (error) {
                    return res.status(400).json({
                        message: error.details[0].message,
                    });
                }
            }
 
            if (schema.query) {
                const { error } = schema.query.validate(req.query);
 
                if (error) {
                    return res.status(400).json({
                        message: error.details[0].message,
                    });
                }
            }
 
            next();
        } catch (error: unknown) {
            return res.status(500).json({
                message: "Validation middleware error",
            });
        }
    };
};