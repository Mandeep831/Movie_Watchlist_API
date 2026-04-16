import express from "express";
import * as watchlistController from "../controllers/watchlistController";
import { authenticate } from "../middleware/authenticate";
import { validateRequest } from "../middleware/validateRequest";
import { watchlistSchemas } from "../validations/watchlistValidation";
 
const router = express.Router();
 
router.get("/", authenticate, watchlistController.getAllWatchlists);
 
router.post(
    "/",
    authenticate,
    validateRequest(watchlistSchemas.create),
    watchlistController.createWatchlist
);
 
router.put(
    "/:id",
    authenticate,
    validateRequest(watchlistSchemas.update),
    watchlistController.updateWatchlist
);
 
router.delete(
    "/:id",
    authenticate,
    validateRequest(watchlistSchemas.delete),
    watchlistController.deleteWatchlist
);
 
export default router;
 