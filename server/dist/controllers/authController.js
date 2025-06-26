"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// POST
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        // Check required fields
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ error: 'Missing user details. All fields are required.' });
            return;
        }
        const normalizedEmail = email.toLowerCase();
        // Hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Create user
        const newUser = await prisma_1.default.user.create({
            data: {
                firstName,
                lastName,
                email: normalizedEmail,
                password: hashedPassword
            }
        });
        // Create session token for user
        const token = jsonwebtoken_1.default.sign({ userID: newUser.id, name: newUser.firstName }, process.env.JWT_SECRET, { expiresIn: '30m' });
        res.status(201).json({
            message: 'Registration successful',
            id: newUser.id,
            name: newUser.firstName,
            email: newUser.email,
            token,
        });
        // TO UPDATE: REVISE WITH CORRECT TYPE
    }
    catch (error) {
        if (error.code === 'P2002') {
            console.error('Error creating user: Email is already used', error);
            res.status(409).json({ error: 'This email is already linked to a profile' });
            return;
        }
        else {
            console.error('Error creating user', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
exports.registerUser = registerUser;
// POST
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check request fields
        if (!email || !password) {
            res.status(400).json({ error: 'Both email and password are required' });
            return;
        }
        const normalizedEmail = email.toLowerCase();
        // Fetch user
        const user = await prisma_1.default.user.findUnique({
            where: { email: normalizedEmail }
        });
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        // Compare passwords
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userID: user.id, name: user.firstName }, process.env.JWT_SECRET, { expiresIn: '30m' });
        // Response
        res.status(200).json({
            message: 'Login successful',
            id: user.id,
            name: user.firstName,
            email: user.email,
            token,
        });
    }
    catch (error) {
        console.error('Login error', error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.loginUser = loginUser;
