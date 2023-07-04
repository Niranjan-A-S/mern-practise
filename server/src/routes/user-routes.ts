import { protect } from './../middleware/auth-middleware';
import { Router } from 'express';
import { getMe, loginUser, registerUser } from '../controllers';

//Here in this file we define the routes for the server

const router = Router();

//This method is used if we have the same route for different requests
router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;
