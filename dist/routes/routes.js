"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
router.post("/auth/signup", controller_1.signup);
router.post("/auth/login", controller_1.login);
router.get("/auth/me", middleware_1.authMiddleware, controller_1.me);
exports.default = router;
