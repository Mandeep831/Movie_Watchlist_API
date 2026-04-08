import { Review } from "../models/reviewModel";
import * as reviewRepository from "../repositories/reviewRepository";

export const createReview = async (review: Review): Promise<Review> => {
  return reviewRepository.createReview(review);
};

export const getAllReviews = async (): Promise<Review[]> => {
  return reviewRepository.getAllReviews();
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