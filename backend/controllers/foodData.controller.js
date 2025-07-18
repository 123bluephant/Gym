import { DailyFoodLog, DailyPlan } from "../Models/foodEntrySchema.js";
import FoodItem from "../Models/FoodItem.js";
import dayjs from 'dayjs';

export const blukdata = async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      return res
        .status(400)
        .json({ error: "Expected an array of food items." });
    }

    await FoodItem.insertMany(data, { ordered: false });
    res.status(201).json({ message: "Food data uploaded successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Error uploading food data.", details: err.message });
  }
};

export const searchFood = async (req, res) => {
  try {
    const { query: name, category } = req.query;

    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: "i" }; // partial + case-insensitive match
    }
    if (category && category !== "all") {
      filter.category = category;
    }

    const foods = await FoodItem.find(filter).limit(30); // Limit for safety
    res.json(foods);
  } catch (err) {
    console.error("❌ Search Food Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const topfood = async (req, res) => {
  try {
    const foods = await FoodItem.find().limit(30);
    console.log(foods, "food");
    res.json(foods);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch food items" });
  }
};

export const top15food = async (req, res) => {
  try {
    const foods = await FoodItem.find().limit(15);
    console.log(foods, "food");
    res.json(foods);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch food items" });
  }
};

export const addFoodToMeal = async (req, res) => {
  try {
    const { user, date, mealType, food, totalGoalCalories, bmi } = req.body;

    let log = await DailyFoodLog.findOne({ user, date });

    if (!log) {
      log = new DailyFoodLog({
        user,
        date,
        meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
        totalGoalCalories: totalGoalCalories || 0,
        bmi: bmi || 0,
      });
    }

    log.meals[mealType].push(food);

    log.totalCalories += food.calculated.calories || 0;
    log.totalProtein += food.calculated.protein || 0;
    log.totalCarbs += food.calculated.carbs || 0;
    log.totalFats += food.calculated.fats || 0;

    if (totalGoalCalories) log.totalGoalCalories = totalGoalCalories;
    if (bmi) log.bmi = bmi;

    await log.save();
    res.status(200).json({ message: "Food added", log });
  } catch (err) {
    console.error("❌ Error adding food", err);
    res.status(500).json({ message: "Failed to add food", error: err.message });
  }
};

export const getMealByType = async (req, res) => {
  try {
    const { userId } = req.params;
    const { date, mealType } = req.query;

    const validMeals = ["breakfast", "lunch", "dinner", "snacks"];
    if (!validMeals.includes(mealType)) {
      return res.status(400).json({ message: "Invalid meal type" });
    }

    const logDate = date ? new Date(date) : new Date();
    logDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(logDate);
    nextDay.setDate(logDate.getDate() + 1);

    const log = await DailyFoodLog.findOne({
      user: userId,
      date: { $gte: logDate, $lt: nextDay },
    });

    if (!log) {
      return res.status(200).json({
        meal: [],
        allmeals: [],
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
        totalFiber: 0,
        totalSugar: 0,
        totalGoalCalories: 0,
        bmi: 0,
        breakfastCalories: 0,
        lunchCalories: 0,
        dinnerCalories: 0,
        snacksCalories: 0,
      });
    }
    const calculateMealCalories = (mealArray) =>
      mealArray.reduce(
        (sum, item) => sum + (item?.calculated?.calories || 0),
        0
      );

    const breakfastCalories = calculateMealCalories(log.meals.breakfast);
    const lunchCalories = calculateMealCalories(log.meals.lunch);
    const dinnerCalories = calculateMealCalories(log.meals.dinner);
    const snacksCalories = calculateMealCalories(log.meals.snacks);

    res.status(200).json({
      meal: log.meals[mealType],
      allmeals: log.meals,
      totalCalories: log.totalCalories || 0,
      totalProtein: log.totalProtein || 0,
      totalCarbs: log.totalCarbs || 0,
      totalFats: log.totalFats || 0,
      totalFiber: log.totalFiber || 0,
      totalSugar: log.totalSugar || 0,
      totalGoalCalories: log.totalGoalCalories || 0,
      bmi: log.bmi || 0,
      breakfastCalories,
      lunchCalories,
      dinnerCalories,
      snacksCalories,
    });
  } catch (error) {
    console.error("❌ Error fetching meal:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeFoodFromMeal = async (req, res) => {
  try {
    const { user, date, mealType, index } = req.body;

    const validMeals = ["breakfast", "lunch", "dinner", "snacks"];
    if (!validMeals.includes(mealType)) {
      return res.status(400).json({ message: "Invalid meal type" });
    }

    const log = await DailyFoodLog.findOne({ user, date });

    if (
      !log ||
      !log.meals[mealType] ||
      index < 0 ||
      index >= log.meals[mealType].length
    ) {
      return res
        .status(400)
        .json({ message: "Invalid index or log not found" });
    }

    const removedFood = log.meals[mealType].splice(index, 1)[0];

    if (removedFood?.calculated) {
      log.totalCalories -= removedFood.calculated.calories || 0;
      log.totalProtein -= removedFood.calculated.protein || 0;
      log.totalCarbs -= removedFood.calculated.carbs || 0;
      log.totalFats -= removedFood.calculated.fats || 0;
    }

    await log.save();
    res.status(200).json({ message: "Food removed successfully", log });
  } catch (error) {
    console.error("❌ Error removing food:", error.message);
    res
      .status(500)
      .json({ message: "Failed to remove food", error: error.message });
  }
};

export const addFoodPlan = async (req, res) => {
  try {
    const { user: userId, weekStartDate, meals, day } = req.body;

    console.log("Adding food plan for user:", userId, "on day:", day, "with meals:", meals);

    if (!userId || !weekStartDate || !meals || !day) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const dayOfWeek = day[0].toUpperCase() + day.slice(1).toLowerCase();  

    const mapFoodItem = (foodItem) => {
      const {
        name,
        category,
        calories,
        protein,
        carbs,
        fats,
        fiber,
        sugar,
      } = foodItem;

      const servings = 1; 

      return {
        name,
        category,
        per100g: {
          calories,
          protein,
          carbs,
          fats,
          fiber,
          sugar,
        },
        servings,
        calculated: {
          calories: calories * servings,
          protein: protein * servings,
          carbs: carbs * servings,
          fats: fats * servings,
          fiber: fiber * servings,
          sugar: sugar * servings,
        },
      };
    };
    const mapMeals = (mealArray) => (mealArray || []).map(mapFoodItem);
    let existingPlan = await DailyPlan.findOne({ userId, weekStartDate });

    if (existingPlan) {
      const prevMeals = existingPlan.plan?.[dayOfWeek] || {
        Breakfast: [],
        Lunch: [],
        Dinner: [],
      };

      console.log("Existing plan found for day:", dayOfWeek);
      existingPlan.plan[dayOfWeek] = {
        Breakfast: [...prevMeals.Breakfast, ...mapMeals(meals.Breakfast)],
        Lunch: [...prevMeals.Lunch, ...mapMeals(meals.Lunch)],
        Dinner: [...prevMeals.Dinner, ...mapMeals(meals.Dinner)],
      };

      await existingPlan.save();

      return res.status(200).json({
        message: "Food plan updated successfully",
        dailyPlan: existingPlan,
      });
    }

    const initialPlan = {
      Monday: { Breakfast: [], Lunch: [], Dinner: [] },
      Tuesday: { Breakfast: [], Lunch: [], Dinner: [] },
      Wednesday: { Breakfast: [], Lunch: [], Dinner: [] },
      Thursday: { Breakfast: [], Lunch: [], Dinner: [] },
      Friday: { Breakfast: [], Lunch: [], Dinner: [] },
      Saturday: { Breakfast: [], Lunch: [], Dinner: [] },
      Sunday: { Breakfast: [], Lunch: [], Dinner: [] },
    };

    initialPlan[dayOfWeek] = {
      Breakfast: mapMeals(meals.Breakfast),
      Lunch: mapMeals(meals.Lunch),
      Dinner: mapMeals(meals.Dinner),
    };

    const newPlan = new DailyPlan({
      userId,
      weekStartDate,
      plan: initialPlan,
    });

    await newPlan.save();

    res.status(201).json({
      message: "Food plan added successfully",
      dailyPlan: newPlan,
    });

  } catch (error) {
    console.error("❌ Error adding food plan:", error.message);
    res.status(500).json({
      message: "Failed to add food plan",
      error: error.message,
    });
  }
};

export const removeFoodPlanItem = async (req, res) => {
  try {
    const { user: userId, weekStartDate, day, mealType, foodId } = req.body;

    console.log("Removing food from plan:", { userId, weekStartDate, day, mealType, foodId }," ", req.body);

    if (!userId || !weekStartDate || !day || !mealType || !foodId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const dayOfWeek = day[0].toUpperCase() + day.slice(1).toLowerCase();

    const existingPlan = await DailyPlan.findOne({ userId, weekStartDate });

    if (!existingPlan) {
      return res.status(404).json({ message: "No plan found for this week" });
    }

    const dayMeals = existingPlan.plan?.[dayOfWeek];

    if (!dayMeals) {
      return res.status(404).json({ message: `No meals found for ${dayOfWeek}` });
    }

    if (!dayMeals[mealType]) {
      return res.status(404).json({ message: `Meal type ${mealType} not found` });
    }
    const updatedMeal = dayMeals[mealType].filter(item => item._id?.toString() !== foodId);

    existingPlan.plan[dayOfWeek][mealType] = updatedMeal;
    await existingPlan.save();
    console.log("Food item removed successfully from plan:", existingPlan);
    res.status(200).json({
      message: "Food item removed successfully",
      dailyPlan: existingPlan,
    });

  } catch (error) {
    console.error("❌ Error removing food item:", error.message);
    res.status(500).json({
      message: "Failed to remove food item",
      error: error.message,
    });
  }
};


export const getDailyFoodPlan = async (req, res) => {
  try {
    const { weekStartDate,userId } = req.query;
    if (!userId || !weekStartDate) {
      return res.status(400).json({ message: "Missing userId or weekStartDate in query" });
    }
    console.log("Fetching food plan for user:", userId, "week starting:", weekStartDate);
    const plan = await DailyPlan.findOne({ userId, weekStartDate });

    if (!plan) {
      return res.status(404).json({ message: "No food plan found for this user and week" });
    }

    res.status(200).json({
      message: "Food plan fetched successfully",
      dailyPlans: plan,
    });
  } catch (error) {
    console.error("❌ Error fetching food plan:", error.message);
    res.status(500).json({
      message: "Failed to fetch food plan",
      error: error.message,
    });
  }
};