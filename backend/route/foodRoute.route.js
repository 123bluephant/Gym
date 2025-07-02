// route/foodroute.route.js
import express from 'express';
import { addFoodToMeal, getMealByType, removeFoodFromMeal, searchFood, topfood } from '../controllers/foodData.controller.js';

const router = express.Router();

router.get('/search', searchFood);
router.get('/top30', topfood);
router.post('/add-Food',addFoodToMeal)
router.get("/get-meal/:userId", getMealByType);
router.post('/remove-food', removeFoodFromMeal);
export default router;