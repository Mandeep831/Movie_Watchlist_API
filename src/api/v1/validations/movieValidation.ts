import Joi from "joi";

export const movieSchemas = {

    create: {
        body: Joi.object({
            title: Joi.string().min(2).required().messages({
                "string.min": 'Validation error: "title" must be at least 2 characters',
                "any.required": 'Validation error: "title" is required',
                "string.empty": 'Validation error: "title" cannot be empty',
            }),

            genre: Joi.string().required().messages({
                "any.required": 'Validation error: "genre" is required',
                "string.empty": 'Validation error: "genre" cannot be empty',
            }),

            releaseYear: Joi.number().integer().required().messages({
                "number.base": 'Validation error: "releaseYear" must be a number',
                "any.required": 'Validation error: "releaseYear" is required',
            }),

            description: Joi.string().required().messages({
                "any.required": 'Validation error: "description" is required',
                "string.empty": 'Validation error: "description" cannot be empty',
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
            id: Joi.string().required(),
        }),
        body: Joi.object({
            title: Joi.string().optional(),
            genre: Joi.string().optional(),
            releaseYear: Joi.number().integer().optional(),
            description: Joi.string().optional(),
        }),
    },

    delete: {
        params: Joi.object({
            id: Joi.string().required(),
        }),
    },
};