import Joi from "joi";

export const createReviewSchema = Joi.object({
  movieId: Joi.string().required(),
  userId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().min(3).max(500).required(),
});

export const updateReviewSchema = Joi.object({
  movieId: Joi.string().optional(),
  userId: Joi.string().optional(),
  rating: Joi.number().min(1).max(5).optional(),
  comment: Joi.string().min(3).max(500).optional(),
});