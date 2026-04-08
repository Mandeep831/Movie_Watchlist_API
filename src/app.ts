import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
 
// Swagger setup
import setupSwagger from "./config/swagger";
 
// Routes
import movieRoutes from "./api/v1/routes/movieRoutes";
import watchlistRoutes from "./api/v1/routes/watchlistRoutes";
import reviewRoutes from "./api/v1/routes/reviewRoutes";
 
const app = express();
 
app.use(helmet());
app.use(cors());
app.use(express.json());
 
// Swagger
setupSwagger(app);
 
// Health Route
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Movie Watchlist API is running",
  });
});
 
// API Routes
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/watchlists", watchlistRoutes);
app.use("/api/v1/reviews", reviewRoutes);
 
// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});
 
// Global Error Handler
app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err);
 
    res.status(err.status || 500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
);
 
export default app;
 