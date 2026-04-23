import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/reviewService";
import { sendEmail } from "../services/emailService";
 
export const createReview = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const review = await reviewService.createReview(req.body);
 
        try {
            await sendEmail(
                process.env.EMAIL_USER!,
                "Review Created Successfully",
                `Your review has been added successfully!.

            Movie ID: ${review.movieId}
            Rating: ${review.rating}

            Thank You for sharing the feedback!`
            );
        } catch (error) {
            console.error("Email failed:", error);
        }
 
        res.status(201).json({
            status: "success",
            data: review,
        });
    } catch (error) {
        next(error);
    }
};
 
export const getAllReviews = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { movieId, sortBy, order } = req.query;

        const reviews = await reviewService.getAllReviews({
            movieId: movieId as string | undefined,
            sortBy: sortBy as string | undefined,
            order: order as "asc" | "desc" | undefined,
        });
 
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
 
        try {
            await sendEmail(
                process.env.EMAIL_USER!,
                "Review Updated",
                `Your review has been updated successfully!

            Update fields:
            ${JSON.stringify(req.body, null, 2)}

            Thanks for keeping your reviews up to date`
            );
        } catch (error) {
            console.error("Email failed:", error);
        }
 
        res.status(200).json({
            status: "success",
            data: updated,
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