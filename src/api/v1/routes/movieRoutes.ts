import { Router } from "express";
import * as movieController from "../controllers/movieController";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validateRequest } from "../middleware/validateRequest";
import { movieSchemas } from "../validations/movieValidation";
 
const router = Router();
 
router.get("/", movieController.getAllMovies);
 
router.get(
    "/:id",
    validateRequest(movieSchemas.getById),
    movieController.getMovieById
);
 
router.post(
    "/",
    authenticate,
    authorize({hasRole: ["admin"]}),
    validateRequest(movieSchemas.create),
    movieController.createMovie
);
 
router.put(
    "/:id",
    authenticate,
    authorize({hasRole: ["admin"]}),
    validateRequest(movieSchemas.update),
    movieController.updateMovie
);
 
router.delete(
    "/:id",
    authenticate,
    authorize({hasRole: ["admin"]}),
    validateRequest(movieSchemas.delete),
    movieController.deleteMovie
);
 
export default router;