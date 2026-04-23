import { Request, Response } from "express";
import * as watchlistService from "../services/watchlistService";
import { sendEmail } from "../services/emailService";
 
export const createWatchlist = async (req: Request, res: Response) => {
    try {
        const watchlist = await watchlistService.createWatchlist(req.body);
 
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
 
export const updateWatchlist = async (req: Request, res: Response) => {
    try {
        const updatedWatchlist = await watchlistService.updateWatchlist(
            req.params.id as string,
            req.body
        );
 
        if (!updatedWatchlist) {
            res.status(404).json({
                status: "error",
                message: "Watchlist not found",
            });
            return;
        }
 
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
 
export const deleteWatchlist = async (req: Request, res: Response) => {
    try {
        const deleted = await watchlistService.deleteWatchlist(
            req.params.id as string
        );
 
        if (!deleted) {
            res.status(404).json({
                status: "error",
                message: "Watchlist not found",
            });
            return;
        }
 
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