import Joi from "joi";

export const reviewSchemas = {
    create: {
        body: Joi.object({
            movieId: Joi.string().required().messages({
                "any.required": 'Validation error: "movieId" is required',
                "string.empty": 'Validation error: "movieId" cannot be empty',
            }),
            userId: Joi.string().required().messages({
                "any.required": 'Validation error: "userId" is required',
                "string.empty": 'Validation error: "userId" cannot be empty',
            }),
            rating: Joi.number().min(1).max(5).required().messages({
                "number.base": 'Validation error: "rating" must be a number',
                "number.min": 'Validation error: "rating" must be at least 1',
                "number.max": 'Validation error: "rating" must be at most 5',
                "any.required": 'Validation error: "rating" is required',
            }),
            comment: Joi.string().min(3).max(500).required().messages({
                "string.min": 'Validation error: "comment" must be at least 3 characters',
                "string.max": 'Validation error: "comment" must be at most 500 characters',
                "any.required": 'Validation error: "comment" is required',
                "string.empty": 'Validation error: "comment" cannot be empty',
            }),
        }),
    },
 
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": 'Validation error: "id" is required',
                "string.empty": 'Validation error: "id" cannot be empty',
            }),
        }),
    },
 
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": 'Validation error: "id" is required',
                "string.empty": 'Validation error: "id" cannot be empty',
            }),
        }),
        body: Joi.object({
            movieId: Joi.string().optional(),
            userId: Joi.string().optional(),
            rating: Joi.number().min(1).max(5).optional().messages({
                "number.base": 'Validation error: "rating" must be a number',
                "number.min": 'Validation error: "rating" must be at least 1',
                "number.max": 'Validation error: "rating" must be at most 5',
            }),
            comment: Joi.string().min(3).max(500).optional().messages({
                "string.min": 'Validation error: "comment" must be at least 3 characters',
                "string.max": 'Validation error: "comment" must be at most 500 characters',
                "string.empty": 'Validation error: "comment" cannot be empty',
            }),
        }),
    },
 
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": 'Validation error: "id" is required',
                "string.empty": 'Validation error: "id" cannot be empty',
            }),
        }),
    },
};