import Joi from "joi";

export const createWatchlistSchema = Joi.object({
    userId: Joi.string().required(),
    movieId: Joi.string().required(),
    status: Joi.string().required(),
});

export const updateWatchlistSchema = Joi.object({
    userId: Joi.string().optional(),
    movieId: Joi.string().optional(),
    status: Joi.string().optional(),
});