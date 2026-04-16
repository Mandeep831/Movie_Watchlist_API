import { Router } from "express";
import * as reviewController from "../controllers/reviewController";
import { authenticate } from "../middleware/authenticate";
import { validateRequest } from "../middleware/validateRequest";
import { reviewSchemas } from "../validations/reviewValidation";
 
const router = Router();
 
router.get("/", reviewController.getAllReviews);
 
router.get(
    "/:id",
    validateRequest(reviewSchemas.getById),
    reviewController.getReviewById
);
 
router.post(
    "/",
    authenticate,
    validateRequest(reviewSchemas.create),
    reviewController.createReview
);
 
router.put(
    "/:id",
    authenticate,
    validateRequest(reviewSchemas.update),
    reviewController.updateReview
);
 
router.delete(
    "/:id",
    authenticate,
    validateRequest(reviewSchemas.delete),
    reviewController.deleteReview
);
 
export default router;