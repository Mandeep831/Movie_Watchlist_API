import { Review } from "../models/reviewModel";
import * as reviewRepository from "../repositories/reviewRepository";

interface ReviewQueryOptions {
  movieId?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const createReview = async (review: Review): Promise<Review> => {
  return reviewRepository.createReview(review);
};

export const getAllReviews = async (
  options?: ReviewQueryOptions
): Promise<Review[]> => {
  return reviewRepository.getAllReviews(options);
};

export const getReviewById = async (id: string): Promise<Review | null> => {
  return reviewRepository.getReviewById(id);
};

export const updateReview = async (
  id: string,
  review: Partial<Review>
): Promise<boolean> => {
  return reviewRepository.updateReview(id, review);
};

export const deleteReview = async (id: string): Promise<boolean> => {
  return reviewRepository.deleteReview(id);
};