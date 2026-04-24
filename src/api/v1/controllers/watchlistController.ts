import { Request, Response } from "express";
import * as watchlistService from "../services/watchlistService";
import { sendEmail } from "../services/emailService";
import { AuthenticatedRequest } from "../middleware/authenticate";

export const createWatchlist = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const userId = req.user?.uid;

        if (!userId) {
            res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
            return;
        }

        const watchlistData = {
            ...req.body,
            userId,
        };

        const watchlist = await watchlistService.createWatchlist(watchlistData);

        try {
            await sendEmail(
                process.env.EMAIL_USER!,
                "Watchlist Created",
                "Your watchlist was created successfully."
            );
        } catch (error) {
            console.error("Email failed:", error);
        }

        res.status(201).json({
            status: "success",
            data: watchlist,
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: "error",
            message: "Failed to create watchlist",
        });
    }
};

export const getAllWatchlists = async (req: Request, res: Response) => {
    try {
        const watchlists = await watchlistService.getAllWatchlists();

        res.status(200).json({
            status: "success",
            data: watchlists,
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch watchlists",
        });
    }
};

export const updateWatchlist = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const id = req.params.id as string;
        const userId = req.user?.uid;

        if (!userId) {
            res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
            return;
        }

        const existingWatchlist = await watchlistService.getWatchlistById(id);

        if (!existingWatchlist) {
            res.status(404).json({
                status: "error",
                message: "Watchlist not found",
            });
            return;
        }

        if (
            existingWatchlist.userId !== userId &&
            req.user?.role !== "admin"
        ) {
            res.status(403).json({
                status: "error",
                message: "Forbidden: You can only update your own watchlist",
            });
            return;
        }

        const updatedWatchlist = await watchlistService.updateWatchlist(
            id,
            req.body
        );

        try {
            await sendEmail(
                process.env.EMAIL_USER!,
                "Watchlist Updated",
                "Your watchlist was updated successfully."
            );
        } catch (error) {
            console.error("Email failed:", error);
        }

        res.status(200).json({
            status: "success",
            data: updatedWatchlist,
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: "error",
            message: "Failed to update watchlist",
        });
    }
};

export const deleteWatchlist = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const id = req.params.id as string;
        const userId = req.user?.uid;

        if (!userId) {
            res.status(401).json({
                status: "error",
                message: "Unauthorized",
            });
            return;
        }

        const existingWatchlist = await watchlistService.getWatchlistById(id);

        if (!existingWatchlist) {
            res.status(404).json({
                status: "error",
                message: "Watchlist not found",
            });
            return;
        }

        if (
            existingWatchlist.userId !== userId &&
            req.user?.role !== "admin"
        ) {
            res.status(403).json({
                status: "error",
                message: "Forbidden: You can only delete your own watchlist",
            });
            return;
        }

        await watchlistService.deleteWatchlist(id);

        res.status(200).json({
            status: "success",
            message: "Watchlist deleted successfully",
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete watchlist",
        });
    }
};