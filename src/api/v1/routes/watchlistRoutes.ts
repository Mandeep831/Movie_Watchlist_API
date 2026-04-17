import express from "express";
import * as watchlistController from "../controllers/watchlistController";
import { authenticate } from "../middleware/authenticate";
import { validateRequest } from "../middleware/validateRequest";
import { watchlistSchemas } from "../validations/watchlistValidation";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Watchlists
 *   description: Watchlist management endpoints
 */

/**
 * @swagger
 * /watchlists:
 *   get:
 *     summary: Get all watchlists
 *     tags: [Watchlists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Watchlists fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, watchlistController.getAllWatchlists);

/**
 * @swagger
 * /watchlists:
 *   post:
 *     summary: Create a watchlist entry
 *     tags: [Watchlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: user001
 *               movieId:
 *                 type: string
 *                 example: movie001
 *               status:
 *                 type: string
 *                 example: watching
 *     responses:
 *       201:
 *         description: Watchlist created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/",
    authenticate,
    validateRequest(watchlistSchemas.create),
    watchlistController.createWatchlist
);

/**
 * @swagger
 * /watchlists/{id}:
 *   put:
 *     summary: Update a watchlist entry
 *     tags: [Watchlists]
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
 *         description: Watchlist updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Watchlist not found
 */
router.put(
    "/:id",
    authenticate,
    validateRequest(watchlistSchemas.update),
    watchlistController.updateWatchlist
);

/**
 * @swagger
 * /watchlists/{id}:
 *   delete:
 *     summary: Delete a watchlist entry
 *     tags: [Watchlists]
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
 *         description: Watchlist deleted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Watchlist not found
 */
router.delete(
    "/:id",
    authenticate,
    validateRequest(watchlistSchemas.delete),
    watchlistController.deleteWatchlist
);

export default router;