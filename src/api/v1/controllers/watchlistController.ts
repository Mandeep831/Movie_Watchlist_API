import { Request, Response } from "express";
import * as service from "../services/watchlistService";

export const createWatchlist = async (req: Request, res: Response) => {
    const result = await service.createWatchlist(req.body);

    res.status(201).json({
        message: "Watchlist created successfully",
        data: result,
    });
};

export const getAllWatchlists = async (req: Request, res: Response) => {
    const data = await service.getAllWatchlists();

    res.status(200).json({
        message: "Watchlists fetched successfully",
        data,
    });
};

export const updateWatchlist = async (req: Request, res: Response) => {
    const watchlistId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const updated = await service.updateWatchlist(watchlistId, req.body);

    if (!updated) {
        res.status(404).json({ message: "Watchlist not found" });
        return;
    }

    res.status(200).json({
        message: "Watchlist updated successfully",
        data: updated,
    });
};

export const deleteWatchlist = async (req: Request, res: Response) => {
    const watchlistId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const deleted = await service.deleteWatchlist(watchlistId);

    if (!deleted) {
        res.status(404).json({ message: "Watchlist not found" });
        return;
    }

    res.status(200).json({
        message: "Watchlist deleted successfully",
    });
};