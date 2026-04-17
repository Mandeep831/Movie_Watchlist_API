import { Router } from "express";
import * as movieController from "../controllers/movieController";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validateRequest } from "../middleware/validateRequest";
import { movieSchemas } from "../validations/movieValidation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management endpoints
 */

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
 *       400:
 *         description: Validation error
 *       404:
 *         description: Movie not found
 */
router.get(
    "/:id",
    validateRequest(movieSchemas.getById),
    movieController.getMovieById
);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - genre
 *               - releaseYear
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Inception
 *               genre:
 *                 type: string
 *                 example: Sci-Fi
 *               releaseYear:
 *                 type: integer
 *                 example: 2010
 *               description:
 *                 type: string
 *                 example: A mind-bending thriller
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post(
    "/",
    authenticate,
    authorize({ hasRole: ["admin"] }),
    validateRequest(movieSchemas.create),
    movieController.createMovie
);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Interstellar
 *               genre:
 *                 type: string
 *                 example: Sci-Fi
 *               releaseYear:
 *                 type: integer
 *                 example: 2014
 *               description:
 *                 type: string
 *                 example: A science fiction film about space and time
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Movie not found
 */
router.put(
    "/:id",
    authenticate,
    authorize({ hasRole: ["admin"] }),
    validateRequest(movieSchemas.update),
    movieController.updateMovie
);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Movie not found
 */
router.delete(
    "/:id",
    authenticate,
    authorize({ hasRole: ["admin"] }),
    validateRequest(movieSchemas.delete),
    movieController.deleteMovie
);

export default router;