import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/reviewService";

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const review = await reviewService.createReview(req.body);

    res.status(201).json({
      status: "success",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reviews = await reviewService.getAllReviews();

    res.status(200).json({
      status: "success",
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getReviewById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const review = await reviewService.getReviewById(id);

    if (!review) {
      res.status(404).json({
        status: "error",
        message: "Review not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const updated = await reviewService.updateReview(id, req.body);

    if (!updated) {
      res.status(404).json({
        status: "error",
        message: "Review not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Review updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const deleted = await reviewService.deleteReview(id);

    if (!deleted) {
      res.status(404).json({
        status: "error",
        message: "Review not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};