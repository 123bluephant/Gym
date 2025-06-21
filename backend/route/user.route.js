// route/user.route.js
import express from 'express';
import { register, loginController, logoutController } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', loginController);
router.post('/logout', logoutController);

export default router;