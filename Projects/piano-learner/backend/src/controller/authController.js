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
exports.loginUser = exports.registerUser = exports.prisma = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
exports.default = exports.prisma;
// Register User method
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName, username } = req.body;
        // Überprüfen, ob der User schon existiert
        const existingUser = yield exports.prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
            },
        });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Passwort hashen
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // User in der DB speichern
        const user = yield exports.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                username,
            },
        });
        res.status(201).json({ message: 'User successfully registered', user });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
exports.registerUser = registerUser;
// Login User method
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Überprüfen, ob der User existiert
        const user = yield exports.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        // Passwort überprüfen
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        // JWT erstellen
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, // Dein geheimer Schlüssel aus der .env
        { expiresIn: '1h' } // Token läuft in 1 Stunde ab
        );
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.loginUser = loginUser;
