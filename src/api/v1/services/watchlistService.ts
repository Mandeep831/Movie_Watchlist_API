import Watchlist from "../models/watchlistModel";
import * as watchlistRepository from "../repositories/watchlistRepository";

export const createWatchlist = async (watchlist: Watchlist) => {
    return await watchlistRepository.createWatchlist(watchlist);
};

export const getAllWatchlists = async () => {
    return await watchlistRepository.getAllWatchlists();
};

export const updateWatchlist = async (
    id: string,
    watchlist: Partial<Watchlist>
) => {
    return await watchlistRepository.updateWatchlist(id, watchlist);
};

export const deleteWatchlist = async (id: string) => {
    return await watchlistRepository.deleteWatchlist(id);
};