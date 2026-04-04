import Watchlist from "../models/watchlistModel";
import * as repo from "../repositories/watchlistRepository";

export const createWatchlist = async (data: Watchlist) => {
    return await repo.createWatchlist(data);
};

export const getAllWatchlists = async () => {
    return await repo.getAllWatchlists();
};

export const updateWatchlist = async (id: string, data: Partial<Watchlist>) => {
    return await repo.updateWatchlist(id, data);
};

export const deleteWatchlist = async (id: string) => {
    return await repo.deleteWatchlist(id);
};