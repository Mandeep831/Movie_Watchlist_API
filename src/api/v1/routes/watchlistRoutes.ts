import express from "express";
import * as controller from "../controllers/watchlistController";
import { validateRequest } from "../middleware/validate";
import {
    createWatchlistSchema,
    updateWatchlistSchema,
} from "../validations/watchlistValidation";

const router = express.Router();

router.get("/", controller.getAllWatchlists);
router.post(
    "/",
    validateRequest(createWatchlistSchema),
    controller.createWatchlist
);
router.put(
    "/:id",
    validateRequest(updateWatchlistSchema),
    controller.updateWatchlist
);
router.delete("/:id", controller.deleteWatchlist);

export default router;