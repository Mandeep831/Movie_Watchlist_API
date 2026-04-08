import { Router } from "express";
import * as reviewController from "../controllers/reviewController";
import { validateRequest } from "../middleware/validate";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../validations/reviewValidation";

const router = Router();

/**
 * @openapi
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags:
 *       - Reviews
 *     responses:
 *       200:
 *         description: Reviews retrieved successfully
 */
router.get("/", reviewController.getAllReviews);

/**
 * @openapi
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review retrieved successfully
 *       404:
 *         description: Review not found
 */
router.get("/:id", reviewController.getReviewById);

/**
 * @openapi
 * /reviews:
 *   post:
 *     summary: Create a review
 *     tags:
 *       - Reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movieId
 *               - userId
 *               - rating
 *               - comment
 *             properties:
 *               movieId:
 *                 type: string
 *               userId:
 *                 type: string
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-04-08T10:30:00.000Z"
 *                 readOnly: true
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-04-08T10:30:00.000Z"
 *                 readOnly: true
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", validateRequest(createReviewSchema), reviewController.createReview);

/**
 * @openapi
 * /reviews/{id}:
 *   put:
 *     summary: Update a review
 *     tags:
 *       - Reviews
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
 *               movieId:
 *                 type: string
 *               userId:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-04-08T10:30:00.000Z"
 *                 readOnly: true
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 */
router.put("/:id", validateRequest(updateReviewSchema), reviewController.updateReview);

/**
 * @openapi
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete("/:id", reviewController.deleteReview);

export default router;