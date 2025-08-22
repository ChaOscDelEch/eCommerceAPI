import type { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { User } from "#models";

export const register: RequestHandler = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const userExists = await User.exists({ email });
    if (userExists) throw new Error('Email already exists.', {cause: {status: 409}});

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
    });

    res.status(201).json({ message: 'User registered successfully', user });
};

export const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });

    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new Error('Invalid credentials', {cause: {status: 401}});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials', {cause: {status: 401}});

    res.json({ message: 'User logged in successfully', user });
};

export const logout: RequestHandler = async (_req, res) => {
    res.status(200).json({ message: 'User logged out successfully' });
};