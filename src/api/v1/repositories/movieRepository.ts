import { db } from "../../../config/firebaseConfig";
import { Movie } from "../models/movieModel";

const collectionName = "movies";

export const getAllMovies = async (): Promise<Movie[]> => {
    try {
        const snapshot = await db.collection(collectionName).get();

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Movie, "id">),
        }));
    } catch (error: unknown) {
        throw error;
    }
};

export const getMovieById = async (id: string): Promise<Movie | null> => {
    try {
        const doc = await db.collection(collectionName).doc(id).get();

        if (!doc.exists) {
            return null;
        }

        return {
            id: doc.id,
            ...(doc.data() as Omit<Movie, "id">),
        };
    } catch (error: unknown) {
        throw error;
    }
};

export const createMovie = async (
    movieData: Omit<Movie, "id">
): Promise<string> => {
    try {
        const docRef = await db.collection(collectionName).add(movieData);
        return docRef.id;
    } catch (error: unknown) {
        throw error;
    }
};

export const updateMovie = async (
    id: string,
    updateData: Partial<Movie>
): Promise<void> => {
    try {
        await db.collection(collectionName).doc(id).update(updateData);
    } catch (error: unknown) {
        throw error;
    }
};

export const deleteMovie = async (id: string): Promise<void> => {
    try {
        await db.collection(collectionName).doc(id).delete();
    } catch (error: unknown) {
        throw error;
    }
};