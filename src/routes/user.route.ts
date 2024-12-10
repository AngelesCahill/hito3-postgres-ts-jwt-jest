import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router();

// path: http:localhost:3000/api/v1/users

router.get("/",verifyToken, userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);

export default router;