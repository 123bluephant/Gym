import DailyFoodLog from "../Models/foodEntrySchema.js";
import FoodItem from "../Models/FoodItem.js"

export const blukdata = async(req,res) =>{
    try {
    const data = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: "Expected an array of food items." });
    }

    await FoodItem.insertMany(data, { ordered: false });
    res.status(201).json({ message: 'Food data uploaded successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error uploading food data.', details: err.message });
  }
}  

export const searchFood = async (req, res) => {
  try {
    const { query: name, category } = req.query;

    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: "i" }; // partial + case-insensitive match
    }
    if (category && category !== 'all') {
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
    console.log(foods,"food")
    res.json(foods);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Failed to fetch food items" });
  }
};

export const addFoodToMeal = async (req, res) => {
  try {
    const { user, date, mealType, food } = req.body;

    // 🧠 Find or create daily log
    let log = await DailyFoodLog.findOne({ user, date });

    if (!log) {
      log = new DailyFoodLog({
        user,
        date,
        meals: { breakfast: [], lunch: [], dinner: [], snacks: [] },
      });
    }

    log.meals[mealType].push(food);

    // Update totals
    log.totalCalories += food.calculated.calories || 0;
    log.totalProtein += food.calculated.protein || 0;
    log.totalCarbs += food.calculated.carbs || 0;
    log.totalFats += food.calculated.fats || 0;

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

    // Validate mealType
    const validMeals = ["breakfast", "lunch", "dinner", "snacks"];
    if (!validMeals.includes(mealType)) {
      return res.status(400).json({ message: "Invalid meal type" });
    }

    const logDate = date ? new Date(date) : new Date();
    logDate.setHours(0, 0, 0, 0); // normalize to start of the day

    const log = await DailyFoodLog.findOne({
      user: userId,
      date: logDate,
    });

    if (!log || !log.meals[mealType]) {
      return res.status(200).json([]); // no entries found
    }
    console.log(log.meals[mealType])
    res.status(200).json(log.meals[mealType]);
  } catch (error) {
    console.error("❌ Error fetching meal:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};