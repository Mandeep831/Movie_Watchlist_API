import express from "express";
import * as controller from "../controllers/watchlistController";
import {
    createWatchlistSchema,
    updateWatchlistSchema,
} from "../validations/watchlistValidation";

const validateRequest = (schema: any) => (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }

    next();
};

const router = express.Router();

router.get("/", controller.getAllWatchlists);
router.post("/", validateRequest(createWatchlistSchema), controller.createWatchlist);
router.put("/:id", validateRequest(updateWatchlistSchema), controller.updateWatchlist);
router.delete("/:id", controller.deleteWatchlist);

export default router;