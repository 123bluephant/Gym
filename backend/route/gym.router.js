import express from "express";
import {
  addTrainerController,
  deleteTrainerController,
  getTrainersInfoController,
  editTrainerController,
  getTrainersController,
  updateGymController,
  getGymController,
  getGymByIdController,
} from "../controllers/gym.controller.js";
import { upload } from "../Middleware/upload.js";
const router = express.Router();


router.post(
  "/update",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "gymImg", maxCount: 5 },
  ]),
  updateGymController
);
router.post("/addtrainers", upload.single("image"), addTrainerController);
router.post("/editTrainer", upload.single("image"), editTrainerController);
router.post("/deleteTrainer/:id", deleteTrainerController);
router.get("/getTrainers", getTrainersController);
router.get("/getTrainers/:id", getTrainersInfoController);
router.get("/getAllgyms", getGymController);
router.get("/getGym/:id", getGymByIdController);
export default router;