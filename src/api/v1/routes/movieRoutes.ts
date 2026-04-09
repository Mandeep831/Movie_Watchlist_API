import { Router } from "express";
import * as movieController from "../controllers/movieController";
 
const router = Router();
 
/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Movies fetched successfully
 */
router.get("/", movieController.getAllMovies);
 
/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie fetched successfully
 */
router.get("/:id", movieController.getMovieById);
 
/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     responses:
 *       201:
 *         description: Movie created successfully
 */
router.post("/", movieController.createMovie);
 
/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie updated successfully
 */
router.put("/:id", movieController.updateMovie);
 
/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 */
router.delete("/:id", movieController.deleteMovie);
 
export default router;
