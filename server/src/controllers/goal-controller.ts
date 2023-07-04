import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { Goal, User } from '../models'
import { IAuthRequest } from '../types';

//These are the controller functions that define what happens when a request is sent to the particular routes 
//The asyncHandler method is used to handle the errors in the asynchronous requests so that we don't need to use try catch block

//! @desc Get goals
//? @route GET /api/goals
//* @access Private
export const getGoals: RequestHandler = asyncHandler(async (req: IAuthRequest, res) => {
    const goals = await Goal.find({ user: req?.user?.id });
    res.status(200).json(goals);
});

//! @desc Set goals
//? @route POST /api/goals
//* @access Private
export const setGoals: RequestHandler = asyncHandler(async (req: IAuthRequest, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    } else {
        const { body: { text }, user } = req;
        await Goal.create({ text, user: user?.id });
        res.status(200).json({ message: 'Set Goal' });
    }
});

//! @desc Update goal
//? @route PUT /api/goal/:id
//* @access Private
export const updateGoal: RequestHandler = asyncHandler(async (req: IAuthRequest, res) => {
    const { params: { id }, body: { text } } = req;
    const goal = await Goal.findById(id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req?.user?.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id, { text }, { new: true });
    res.status(200).json(updatedGoal);
});

//! @desc Delete goal
//? @route DELETE /api/goal/:id
//* @access Private
export const deleteGoal: RequestHandler = asyncHandler(async (req: IAuthRequest, res) => {
    const { params: { id } } = req;
    const goal = await Goal.findById(id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req?.user?.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await Goal.findByIdAndDelete(id);
    res.status(200).json({ id });
});