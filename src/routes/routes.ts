import express from "express"
import { login, me, signup } from "../controllers/controller";


const router = express.Router();

router.post("/auth/signup",signup);
router.post("/auth/login",login);
router.post("/auth/me",me);

export default router;