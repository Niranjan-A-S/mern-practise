import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { User } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IAuthRequest } from '../types';


//These are the controller functions that define what happens when a request is sent to the particular routes 
//The asyncHandler method is used to handle the errors in the asynchronous requests so that we don't need to use try catch block

//This is used to generate the token by jwt 
const generateToken = (id: string) => jwt.sign({ id }, process.env.SECRET!, { expiresIn: '30d' });

//! @desc Register new user
//? @route POST /api/users
//* @access Public
export const registerUser: RequestHandler = asyncHandler(async (req, res) => {
    const { body: { name, email, age, password } } = req;

    if (!email || !name || !password) {
        res.status(400);
        throw new Error('Please add all the fields');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        name, email, password: hashedPassword, age
    });

    if (user) {
        res.status(201).json({
            token: generateToken(user._id as string)
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
});

//! @desc Login user
//? @route POST /api/login
//* @access Public
export const loginUser: RequestHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error('Invalid User');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (isPasswordCorrect) {
        res.status(201).json({
            name: user.name,
            token: generateToken(user._id as string)
        });
    } else {
        res.status(400);
        throw new Error('Invalid Credentials');
    }
});

//! @desc Get user data
//? @route GET /api/users/me
//* @access Private
export const getMe: RequestHandler = asyncHandler(async (req: IAuthRequest, res) => {
    res.status(200).json(req.user);
});
