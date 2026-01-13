"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.signup = void 0;
const types_1 = require("../types");
const models_1 = require("../models/models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = types_1.SignupUserSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            success: false,
            error: "Invalid request schema",
        });
        return;
    }
    const userWithSameEmail = yield models_1.UserModel.findOne({
        email: data.email,
    });
    if (userWithSameEmail) {
        res.status(400).json({
            success: false,
            error: "Email already exists",
        });
        return;
    }
    const userDb = yield models_1.UserModel.create({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
    });
    res.json({
        success: true,
        data: {
            _id: userDb._id,
            name: userDb.name,
            email: userDb.email,
            role: userDb.role,
        },
    });
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data } = types_1.LoginUserSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            "success": false,
            "error": "Invalid Email or password",
        });
        return;
    }
    const userInDb = yield models_1.UserModel.findOne({
        email: data.email,
    });
    if (!userInDb || userInDb.password != data.password) {
        res.status(400).json({
            "success": false,
            "error": "Invalid Email or password",
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        userId: userInDb._id,
        role: userInDb.role,
    }, process.env.JWT_SECRET);
    res.status(200).json({
        "success": true,
        "data": {
            token: token,
        },
    });
});
exports.login = login;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInDb = yield models_1.UserModel.findOne({
        _id: req.userId
    });
    if (!userInDb) {
        res.status(400).json({
            "success": false,
            "error": "Invalid Data",
        });
        return;
    }
    res.status(200).json({
        "success": true,
        "data": {
            "_id": userInDb._id,
            "name": userInDb.name,
            "email": userInDb.email,
            "role": userInDb.role,
        },
    });
});
exports.me = me;
