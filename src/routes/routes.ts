import express from "express"
import { login, me, signup } from "../controllers/controller";
import { authMiddleware } from "../middleware";


const router = express.Router();

router.post("/auth/signup",signup);
router.post("/auth/login",login);
router.get("/auth/me",authMiddleware,me);

export default router;