// route/user.route.js
import express from 'express';
import { loginController, logoutController, register_gym, register_user } from '../controllers/user.controller.js';
const router = express.Router();

router.post('/register/gym_owner', register_gym);
router.post('/register/user', register_user);
router.post('/login', loginController);
router.post('/logout', logoutController);

export default router;