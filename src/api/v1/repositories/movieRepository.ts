import { db } from "../../../config/firebaseConfig";
import { Movie } from "../models/movieModel";

const collectionName = "movies";

export const movieRepository = {
    async getAll(): Promise<Movie[]> {
        const snapshot = await db.collection(collectionName).get();

        return snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Movie, "id">),
        }));
    },

    async getById(id: string): Promise<Movie | null> {
        const doc = await db.collection(collectionName).doc(id).get();

        if (!doc.exists) {
            return null;
        }

        return {
            id: doc.id,
            ...(doc.data() as Omit<Movie, "id">),
        };
    },

    async create(movieData: Omit<Movie, "id" | "createdAt">): Promise<Movie> {
        const newMovie = {
            ...movieData,
            createdAt: new Date(),
        };

        const docRef = await db.collection(collectionName).add(newMovie);

        return {
            id: docRef.id,
            ...newMovie,
        };
    },

    async update(
        id: string,
        movieData: Partial<Omit<Movie, "id" | "createdAt">>
    ): Promise<Movie | null> {
        const docRef = db.collection(collectionName).doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return null;
        }

        await docRef.update(movieData);

        const updatedDoc = await docRef.get();

        return {
            id: updatedDoc.id,
            ...(updatedDoc.data() as Omit<Movie, "id">),
        };
    },

    async delete(id: string): Promise<boolean> {
        const docRef = db.collection(collectionName).doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return false;
        }

        await docRef.delete();
        return true;
    },
};