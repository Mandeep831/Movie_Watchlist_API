import { Request, Response, NextFunction } from "express";
import * as reviewService from "../services/reviewService";
import { sendEmail } from "../services/emailService";
import { AuthenticatedRequest } from "../middleware/authenticate";

export const createReview = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.user?.uid;

        if (!userId) {
            res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
            return;
        }

        const reviewData = {
            ...req.body,
            userId,
        };

        const review = await reviewService.createReview(reviewData);

        try {
            await sendEmail(
                process.env.EMAIL_USER!,
                "Review Added",
                "Your review was added successfully."
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
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = String(req.params.id);
        const userId = req.user?.uid;

        if (!userId) {
            res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
            return;
        }

        const existingReview = await reviewService.getReviewById(id);

        if (!existingReview) {
            res.status(404).json({
                status: "error",
                message: "Review not found",
            });
            return;
        }

        if (existingReview.userId !== userId && req.user?.role !== "admin") {
            res.status(403).json({
                status: "error",
                message: "Forbidden: You can only update your own review",
            });
            return;
        }

        const updated = await reviewService.updateReview(id, req.body);

        try {
            await sendEmail(
                process.env.EMAIL_USER!,
                "Review Updated",
                "Your review was updated successfully."
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
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = String(req.params.id);
        const userId = req.user?.uid;

        if (!userId) {
            res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
            return;
        }

        const existingReview = await reviewService.getReviewById(id);

        if (!existingReview) {
            res.status(404).json({
                status: "error",
                message: "Review not found",
            });
            return;
        }

        if (existingReview.userId !== userId && req.user?.role !== "admin") {
            res.status(403).json({
                status: "error",
                message: "Forbidden: You can only delete your own review",
            });
            return;
        }

        await reviewService.deleteReview(id);

        res.status(200).json({
            status: "success",
            message: "Review deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};