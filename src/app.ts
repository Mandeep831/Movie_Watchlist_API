import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

// Swagger setup
import setupSwagger from "./config/swagger";

// Routes
import movieRoutes from "./api/v1/routes/movieRoutes";
import watchlistRoutes from "./api/v1/routes/watchlistRoutes";
import reviewRoutes from "./api/v1/routes/reviewRoutes";

const app = express();

// Security middleware (optimized for API)
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// CORS configuration
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Body parser
app.use(express.json());

// Swagger documentation
setupSwagger(app);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is running successfully
 */
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Movie Watchlist API is running",
  });
});

// API routes
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/watchlists", watchlistRoutes);
app.use("/api/v1/reviews", reviewRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Global error handler
app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err);

    res.status(err.status || 500).json({
      status: "error",
      message: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && {
        stack: err.stack,
      }),
    });
  }
);

export default app;