import { Movie } from "../models/movieModel";
import * as movieRepository from "../repositories/movieRepository";

export const getAllMovies = async (): Promise<Movie[]> => {
    try {
        return await movieRepository.getAllMovies();
    } catch (error: unknown) {
        throw error;
    }
};

export const getMovieById = async (id: string): Promise<Movie | null> => {
    try {
        return await movieRepository.getMovieById(id);
    } catch (error: unknown) {
        throw error;
    }
};

export const createMovie = async (
    movieData: Omit<Movie, "id" | "createdAt">
): Promise<Movie> => {
    try {
        const newMovie = {
            ...movieData,
            createdAt: new Date().toISOString(),
        };

        const id = await movieRepository.createMovie(newMovie);

        return { id, ...newMovie };
    } catch (error: unknown) {
        throw error;
    }
};

export const updateMovie = async (
    id: string,
    updateData: Partial<Movie>
): Promise<Movie | null> => {
    try {
        const existingMovie = await movieRepository.getMovieById(id);

        if (!existingMovie) {
            return null;
        }

        const updatedMovie = {
            ...updateData,
        };

        await movieRepository.updateMovie(id, updatedMovie);

        return {
            ...existingMovie,
            ...updatedMovie,
        };
    } catch (error: unknown) {
        throw error;
    }
};

export const deleteMovie = async (id: string): Promise<boolean> => {
    try {
        const existingMovie = await movieRepository.getMovieById(id);

        if (!existingMovie) {
            return false;
        }

        await movieRepository.deleteMovie(id);

        return true;
    } catch (error: unknown) {
        throw error;
    }
};