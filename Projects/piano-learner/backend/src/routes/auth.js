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
const express_1 = require("express");
const authController_1 = require("../controller/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const authController_2 = __importDefault(require("../controller/authController"));
const router = (0, express_1.Router)();
router.post('/register', authController_1.registerUser);
router.post('/login', authController_1.loginUser);
// Geschützte Route
router.get('/profile', authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const user = yield authController_2.default.user.findUnique({
            where: { id: req.user.userId },
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}));
exports.default = router;
