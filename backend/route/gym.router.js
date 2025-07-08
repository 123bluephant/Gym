import express from 'express';
import { updateGymController } from '../controllers/gym.controller.js';

const router = express.Router();

router.post('/update',updateGymController);

export default router;