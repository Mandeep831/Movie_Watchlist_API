import { Request, Response } from "express";
import * as movieService from "../services/movieService";
import { sendEmail } from "../services/emailService";

export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await movieService.getAllMovies();
        res.status(200).json(movies);
    } catch (error: unknown) {
        res.status(500).json({ message: "Failed to fetch movies" });
    }
};

export const getMovieById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        const movie = await movieService.getMovieById(id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(movie);
    } catch (error: unknown) {
        res.status(500).json({ message: "Failed to fetch movie" });
    }
};

export const createMovie = async (req: Request, res: Response) => {
    try {
        const movieData = req.body;

        const newMovie = await movieService.createMovie(movieData);

        // send email after creation
        try {
            await sendEmail(
                "youremail@gmail.com",
                "Movie Added",
                "A new movie movie was added successfully."
            );
        } catch (error) {
            console.error("Email failed:", error)
        }

        res.status(201).json(newMovie);
    } catch (error: unknown) {
        res.status(500).json({ message: "Failed to create movie" });
    }
};

export const updateMovie = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const updateData = req.body;

        const updatedMovie = await movieService.updateMovie(id, updateData);

        // send email after update
        try {
            await sendEmail(
                "youremail@gmail.com",
                "Movie Updated",
                "A new movie movie was added successfully."
            );
        } catch (error) {
            console.error("Email failed:", error)
        }

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(updatedMovie);
    } catch (error: unknown) {
        res.status(500).json({ message: "Failed to update movie" });
    }
};

export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        const isDeleted = await movieService.deleteMovie(id);

        if (!isDeleted) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error: unknown) {
        res.status(500).json({ message: "Failed to delete movie" });
    }
};