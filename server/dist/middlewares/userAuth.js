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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const User_1 = __importDefault(require("../models/User"));
(0, dotenv_1.config)();
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader) {
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        else {
            token = authHeader;
        }
    }
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided',
        });
    }
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token payload',
            });
        }
        const user = yield User_1.default.findById(decoded.id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }
        req.user = user;
        next(); // Proceed to next middleware
    }
    catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Invalid token',
            error: error.message || 'Token verification failed',
        });
    }
});
exports.default = userAuth;
