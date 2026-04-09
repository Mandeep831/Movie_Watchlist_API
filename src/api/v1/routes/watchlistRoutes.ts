import express from "express";
import * as controller from "../controllers/watchlistController";
import { validateRequest } from "../middleware/validate";
import {
  createWatchlistSchema,
  updateWatchlistSchema,
} from "../validations/watchlistValidation";
 
const router = express.Router();
 
/**
 * @swagger
 * /watchlists:
 *   get:
 *     summary: Get all watchlists
 *     tags: [Watchlists]
 *     responses:
 *       200:
 *         description: Watchlists fetched successfully
 */
router.get("/", controller.getAllWatchlists);
 
/**
 * @swagger
 * /watchlists:
 *   post:
 *     summary: Create a new watchlist
 *     tags: [Watchlists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             userId: "u1"
 *             movieId: "m1"
 *             status: "watching"
 *     responses:
 *       201:
 *         description: Watchlist created successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/",
  validateRequest(createWatchlistSchema),
  controller.createWatchlist
);
 
/**
 * @swagger
 * /watchlists/{id}:
 *   put:
 *     summary: Update a watchlist
 *     tags: [Watchlists]
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
 *           example:
 *             userId: "u1"
 *             movieId: "m1"
 *             status: "watched"
 *     responses:
 *       200:
 *         description: Watchlist updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Watchlist not found
 */
router.put(
  "/:id",
  validateRequest(updateWatchlistSchema),
  controller.updateWatchlist
);
 
/**
 * @swagger
 * /watchlists/{id}:
 *   delete:
 *     summary: Delete a watchlist
 *     tags: [Watchlists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Watchlist deleted successfully
 *       404:
 *         description: Watchlist not found
 */
router.delete("/:id", controller.deleteWatchlist);
 
export default router;
 