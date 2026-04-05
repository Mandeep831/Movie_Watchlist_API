import { db } from "../../../config/firebaseConfig";
import Watchlist from "../models/watchlistModel";

const collectionName = "watchlists";

export const createWatchlist = async (watchlist: Watchlist) => {
    const watchlistData = {
        userId: watchlist.userId,
        movieId: watchlist.movieId,
        status: watchlist.status,
        createdAt: new Date(),
    };

    const docRef = await db.collection(collectionName).add(watchlistData);

    return {
        id: docRef.id,
        ...watchlistData,
    };
};

export const getAllWatchlists = async () => {
    const snapshot = await db.collection(collectionName).get();

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const updateWatchlist = async (
    id: string,
    watchlist: Partial<Watchlist>
) => {
    const docRef = db.collection(collectionName).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
        return null;
    }

    await docRef.update(watchlist);

    const updatedDoc = await docRef.get();

    return {
        id: updatedDoc.id,
        ...updatedDoc.data(),
    };
};

export const deleteWatchlist = async (id: string) => {
    const docRef = db.collection(collectionName).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
        return false;
    }

    await docRef.delete();
    return true;
};