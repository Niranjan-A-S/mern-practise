import { Router } from 'express';
import { getGoals, setGoals, updateGoal, deleteGoal } from '../controllers';
import { protect } from '../middleware';

//Here in this file we define the routes for the server

const router = Router();

//This method is used if we have the same route for different requests
router.route('/').get(protect, getGoals).post(protect, setGoals);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

export default router;
