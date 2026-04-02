import express, { Express, Request, Response } from "express";

const app: Express = express();

// Middleware
app.use(express.json());

// Basic health route
app.get("/api/v1/health", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "Movie Watchlist API is running",
    });
});

export default app;