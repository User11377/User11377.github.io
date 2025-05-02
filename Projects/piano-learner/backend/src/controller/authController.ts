import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

// Register User method
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Überprüfen, ob der User schon existiert
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Passwort hashen
        const hashedPassword = await bcrypt.hash(password, 10);

        // User in der DB speichern
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: 'User successfully registered', user });
    } catch (error) {
        res.status(500).json({ 
            message: 'Internal Server Error', 
            error: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
};

// Login User method
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Überprüfen, ob der User existiert
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }

        // Passwort überprüfen
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // JWT erstellen
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET as string, // Dein geheimer Schlüssel aus der .env
            { expiresIn: '1h' }  // Token läuft in 1 Stunde ab
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ 
            message: 'Internal Server Error', 
            error: error instanceof Error ? error.message : 'Unknown error' 
        });
    }
};
