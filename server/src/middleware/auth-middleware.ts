import { NextFunction, Request, RequestHandler, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import { User } from "../models";
import { IAuthRequest, IUser } from "../types";

export const protect: RequestHandler = asyncHandler(async (req: IAuthRequest, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const { id } = jwt.verify(token, process.env.SECRET!) as { id: string };
            const user = await User.findById(id).select('-password') as IUser; // Assign the user to req.user
            if (!user) {
                throw new Error();
            }
            req.user = user;
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});
