import express from 'express';
import { addTrainerController, deleteTrainerController, editTrainerController, getTrainersController, updateGymController } from '../controllers/gym.controller.js';
import {upload} from '../Middleware/upload.js'; 
import { get } from 'mongoose';
const router = express.Router();

router.post('/update',updateGymController);
router.post('/addtrainers', upload.single("image")  ,addTrainerController);
router.post('/editTrainer',upload.single("image"),editTrainerController);
router.post('/deleteTrainer/:id',deleteTrainerController);
router.get('/getTrainers', getTrainersController);
// router.get('/getTrainers/:id', getTrainersInfoController);

export default router;