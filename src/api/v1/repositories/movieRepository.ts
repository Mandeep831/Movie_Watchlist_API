import { db } from "../../../config/firebaseConfig";
import { Movie } from "../models/movieModel";
 
const collectionName = "movies";
 
export const getAllMovies = async (): Promise<Movie[]> => {
  try {
    const snapshot = await db.collection(collectionName).get();
 
    return snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...(doc.data() as Omit<Movie, "id">),
    }));
  } catch (error) {
    throw error;
  }
};
 
export const getMovieById = async (
  id: string
): Promise<Movie | null> => {
  try {
    const doc = await db.collection(collectionName).doc(id).get();
 
    if (!doc.exists) {
      return null;
    }
 
    return {
      id: doc.id,
      ...(doc.data() as Omit<Movie, "id">),
    };
  } catch (error) {
    throw error;
  }
};
 
export const createMovie = async (movieData: Movie): Promise<string> => {
  try {
    const docRef = await db.collection(collectionName).add(movieData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};
 
export const updateMovie = async (
  id: string,
  updateData: Partial<Movie>
): Promise<boolean> => {
  try {
    const docRef = db.collection(collectionName).doc(id);
    const doc = await docRef.get();
 
    if (!doc.exists) {
      return false;
    }
 
    await docRef.update(updateData);
    return true;
  } catch (error) {
    throw error;
  }
};
 
export const deleteMovie = async (id: string): Promise<boolean> => {
  try {
    const docRef = db.collection(collectionName).doc(id);
    const doc = await docRef.get();
 
    if (!doc.exists) {
      return false;
    }
 
    await docRef.delete();
    return true;
  } catch (error) {
    throw error;
  }
};
 