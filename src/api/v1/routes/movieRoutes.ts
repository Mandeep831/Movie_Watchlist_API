import express, { Router } from "express";
import * as movieController from "../controllers/movieController";
import { validateRequest } from "../middleware/validateRequest";
import { movieSchemas } from "../validations/movieValidation";

const router: Router = express.Router();

router.post(
    "/",
    validateRequest(movieSchemas.create),
    movieController.createMovie
);

router.get(
    "/",
    movieController.getAllMovies
);

router.get(
    "/:id",
    validateRequest(movieSchemas.getById),
    movieController.getMovieById
);

router.put(
    "/:id",
    validateRequest(movieSchemas.update),
    movieController.updateMovie
);

router.delete(
    "/:id",
    validateRequest(movieSchemas.delete),
    movieController.deleteMovie
);

export default router;