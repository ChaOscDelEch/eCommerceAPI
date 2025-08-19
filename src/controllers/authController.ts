import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "#models";

export const register: RequestHandler = async (req, res) => {

    const { email, password } = req.body;

    const userExists = await User.exists({ email });
    if (userExists) throw new Error('Email already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
        return res.status(400).json({ error: 'First name and last name are required.' });
    }

    const user = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
    });

    res.status(201).json({ message : 'User registered successfully', user});
};

export const logout: RequestHandler = async (req, res) => {
    // In a stateless JWT authentication system, logout is typically handled on the client side
    res.status(200).json({ message : 'User logged out successfully'});
};

export const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }
};
