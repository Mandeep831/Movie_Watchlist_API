import Joi from "joi";

export const createMovieSchema = Joi.object({
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
});

export const updateMovieSchema = Joi.object({
    title: Joi.string().min(2).optional().messages({
        "string.min": 'Validation error: "title" must be at least 2 characters',
        "string.empty": 'Validation error: "title" cannot be empty',
    }),
    genre: Joi.string().optional().messages({
        "string.empty": 'Validation error: "genre" cannot be empty',
    }),
    releaseYear: Joi.number().integer().optional().messages({
        "number.base": 'Validation error: "releaseYear" must be a number',
    }),
    description: Joi.string().optional().messages({
        "string.empty": 'Validation error: "description" cannot be empty',
    }),
});

export const movieIdSchema = Joi.object({
    id: Joi.string().required().messages({
        "any.required": 'Validation error: "id" is required',
        "string.empty": 'Validation error: "id" cannot be empty',
    }),
});