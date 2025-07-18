// route/foodroute.route.js
import express from 'express';
import { addFoodToMeal, getMealByType, removeFoodFromMeal,top15food, searchFood, topfood, addFoodPlan, getDailyFoodPlan, removeFoodPlanItem } from '../controllers/foodData.controller.js';

const router = express.Router();

router.get('/search', searchFood);
router.get('/top30', topfood);
router.get('/top15', top15food);
router.post('/add-Food',addFoodToMeal)
router.get("/get-meal/:userId", getMealByType);
router.post('/remove-food', removeFoodFromMeal);
router.post('/addFoodPlan', addFoodPlan);
router.get('/food-plan', getDailyFoodPlan);
router.post('/removeFoodPlanItem', removeFoodPlanItem);

export default router;