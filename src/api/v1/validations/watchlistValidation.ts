import Joi from "joi";

export const watchlistSchemas = {
    create: {
        body: Joi.object({
            movieId: Joi.string().required().messages({
                "any.required": 'Validation error: "movieId" is required',
                "string.empty": 'Validation error: "movieId" cannot be empty',
            }),
            status: Joi.string().required().messages({
                "any.required": 'Validation error: "status" is required',
                "string.empty": 'Validation error: "status" cannot be empty',
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
            status: Joi.string().optional().messages({
                "string.empty": 'Validation error: "status" cannot be empty',
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