import { Request, Response } from "express";
import * as watchlistService from "../services/watchlistService";
import { sendEmail } from "../services/emailService";

export const createWatchlist = async (req: Request, res: Response) => {
    const watchlist = await watchlistService.createWatchlist(req.body);

    // send email
    try {
        await sendEmail(
            "yourgmail@gmail.com",
            "Watchlist Created",
            "Your watchlist was created successfully."
        );
    } catch (error) {

        console.error("Email failed:", error);
    }

    res.status(201).json({
        message: "Watchlist created successfully",
        data: watchlist,
    });
};

export const getAllWatchlists = async (req: Request, res: Response) => {
    const watchlists = await watchlistService.getAllWatchlists();

    res.status(200).json({
        message: "Watchlists fetched successfully",
        data: watchlists,
    });
};

export const updateWatchlist = async (req: Request, res: Response) => {
    const updatedWatchlist = await watchlistService.updateWatchlist(
        req.params.id as string,
        req.body
    );

    if (!updatedWatchlist) {
        res.status(404).json({
            message: "Watchlist not found",
        });
        return;
    }

    // send email after successful update
    try {
        await sendEmail(
            "yourgmail@gmail.com",
            "Watchlist Created",
            "Your watchlist was created successfully."
        );
    } catch (error) {

        console.error("Email failed:", error);
    }

    res.status(200).json({
        message: "Watchlist updated successfully",
        data: updatedWatchlist,
    });
};

export const deleteWatchlist = async (req: Request, res: Response) => {
    const deleted = await watchlistService.deleteWatchlist(req.params.id as string);

    if (!deleted) {
        res.status(404).json({
            message: "Watchlist not found",
        });
        return;
    }

    res.status(200).json({
        message: "Watchlist deleted successfully",
    });
};