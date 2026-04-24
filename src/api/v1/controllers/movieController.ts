import { Request, Response } from "express";
import * as movieService from "../services/movieService";
import { sendEmail } from "../services/emailService";
import { searchMoviesFromTmdb } from "../services/tmdbService";
 
export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await movieService.getAllMovies();
 
        res.status(200).json({
            status: "success",
            data: movies,
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch movies",
        });
    }
};
 
export const getMovieById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const movie = await movieService.getMovieById(id);
 
        if (!movie) {
            res.status(404).json({
                status: "error",
                message: "Movie not found",
            });
            return;
        }
 
        res.status(200).json({
            status: "success",
            data: movie,
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: "error",
            message: "Failed to fetch movie",
        });
    }
};
 
export const searchTmdbMovies = async (req: Request, res: Response) => {
    try {
        const query = req.query.query as string;
 
        if (!query || !query.trim()) {
            res.status(400).json({
                status: "error",
                message: "Query parameter is required",
            });
            return;
        }
 
        const results = await searchMoviesFromTmdb(query);
 
        res.status(200).json({
            status: "success",
            data: results,
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: "error",
            message: "Failed to search TMDB movies",
        });
    }
};
 
export const createMovie = async (req: Request, res: Response) => {
    try {
        const movieData = req.body;
        const newMovie = await movieService.createMovie(movieData);
 
        try {
            await sendEmail(
                process.env.EMAIL_USER!,
                "Movie Added",
                "A new movie was added successfully."
            );
        } catch (error) {
            console.error("Email failed:", error);
        }
 
        res.status(201).json({
            status: "success",
            data: newMovie,
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: "error",
            message: "Failed to create movie",
        });
    }
};
 
export const updateMovie = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const updateData = req.body;
        const updatedMovie = await movieService.updateMovie(id, updateData);
 
        if (!updatedMovie) {
            res.status(404).json({
                status: "error",
                message: "Movie not found",
            });
            return;
        }
 
        try {
            await sendEmail(
                process.env.EMAIL_USER!,
                "Movie Updated",
                "A movie was updated successfully."
            );
        } catch (error) {
            console.error("Email failed:", error);
        }
 
        res.status(200).json({
            status: "success",
            data: updatedMovie,
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: "error",
            message: "Failed to update movie",
        });
    }
};
 
export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const isDeleted = await movieService.deleteMovie(id);
 
        if (!isDeleted) {
            res.status(404).json({
                status: "error",
                message: "Movie not found",
            });
            return;
        }
 
        res.status(200).json({
            status: "success",
            message: "Movie deleted successfully",
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: "error",
            message: "Failed to delete movie",
        });
    }
};
