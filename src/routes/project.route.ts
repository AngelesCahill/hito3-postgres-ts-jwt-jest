import { Router } from "express";
import { projectController } from "../controllers/project.controller";
//import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

// path: http:localhost:3000/api/v1/projects

router.get("/", projectController.findAll);
router.get("/:uid", projectController.findOneById);
router.post("/", projectController.create);
router.delete('/:uid', projectController.deleteById)

export default router;