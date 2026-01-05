import express from "express"
import { getMe } from "../controllers/controller";

const router = express.Router();

router.get('/getMe',getMe);

export default router;