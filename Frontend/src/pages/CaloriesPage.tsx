import React, { useState, useEffect } from 'react';
import { Search, Plus, Target, Activity, TrendingUp, User, Scale, Calculator, Coffee, Sun, Moon, Cookie, Apple, Wheat, Beef, Fish, Salad, Pizza, ChefHat, Clock } from 'lucide-react';

interface Food {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  sugar: number;
  serving: string;
  category: 'fruits' | 'vegetables' | 'grains' | 'proteins' | 'dairy' | 'nuts' | 'beverages' | 'snacks' | 'meals' | 'fast-food';
}

interface ConsumedFood extends Food {
  quantity: number;
  consumedAt: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

interface UserProfile {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
}

const foodDatabase: Food[] = [
  // Fruits
  { id: 1, name: "Apple", calories: 52, protein: 0.3, carbs: 14, fats: 0.2, fiber: 2.4, sugar: 10, serving: "100g", category: "fruits" },
  { id: 2, name: "Banana", calories: 89, protein: 1.1, carbs: 23, fats: 0.3, fiber: 2.6, sugar: 12, serving: "100g", category: "fruits" },
  { id: 3, name: "Orange", calories: 47, protein: 0.9, carbs: 12, fats: 0.1, fiber: 2.4, sugar: 9.4, serving: "100g", category: "fruits" },
  { id: 4, name: "Strawberries", calories: 32, protein: 0.7, carbs: 8, fats: 0.3, fiber: 2, sugar: 4.9, serving: "100g", category: "fruits" },
  { id: 5, name: "Blueberries", calories: 57, protein: 0.7, carbs: 14, fats: 0.3, fiber: 2.4, sugar: 10, serving: "100g", category: "fruits" },
  { id: 6, name: "Mango", calories: 60, protein: 0.8, carbs: 15, fats: 0.4, fiber: 1.6, sugar: 13.7, serving: "100g", category: "fruits" },
  { id: 7, name: "Pineapple", calories: 50, protein: 0.5, carbs: 13, fats: 0.1, fiber: 1.4, sugar: 9.9, serving: "100g", category: "fruits" },
  { id: 8, name: "Grapes", calories: 62, protein: 0.6, carbs: 16, fats: 0.2, fiber: 0.9, sugar: 16, serving: "100g", category: "fruits" },
  { id: 9, name: "Watermelon", calories: 30, protein: 0.6, carbs: 8, fats: 0.2, fiber: 0.4, sugar: 6.2, serving: "100g", category: "fruits" },
  { id: 10, name: "Papaya", calories: 43, protein: 0.5, carbs: 11, fats: 0.3, fiber: 1.7, sugar: 7.8, serving: "100g", category: "fruits" },
  { id: 11, name: "Kiwi", calories: 61, protein: 1.1, carbs: 15, fats: 0.5, fiber: 3, sugar: 9, serving: "100g", category: "fruits" },
  { id: 12, name: "Pomegranate", calories: 83, protein: 1.7, carbs: 19, fats: 1.2, fiber: 4, sugar: 13.7, serving: "100g", category: "fruits" },
  { id: 13, name: "Guava", calories: 68, protein: 2.6, carbs: 14, fats: 1, fiber: 5.4, sugar: 8.9, serving: "100g", category: "fruits" },
  { id: 14, name: "Avocado", calories: 160, protein: 2, carbs: 9, fats: 15, fiber: 7, sugar: 0.7, serving: "100g", category: "fruits" },

  // Vegetables
  { id: 15, name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fats: 0.4, fiber: 2.6, sugar: 1.5, serving: "100g", category: "vegetables" },
  { id: 16, name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, fiber: 2.2, sugar: 0.4, serving: "100g", category: "vegetables" },
  { id: 17, name: "Carrots", calories: 41, protein: 0.9, carbs: 10, fats: 0.2, fiber: 2.8, sugar: 4.7, serving: "100g", category: "vegetables" },
  { id: 18, name: "Bell Pepper", calories: 31, protein: 1, carbs: 7, fats: 0.3, fiber: 2.5, sugar: 4.2, serving: "100g", category: "vegetables" },
  { id: 19, name: "Tomato", calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, fiber: 1.2, sugar: 2.6, serving: "100g", category: "vegetables" },
  { id: 20, name: "Cucumber", calories: 16, protein: 0.7, carbs: 4, fats: 0.1, fiber: 0.5, sugar: 1.7, serving: "100g", category: "vegetables" },
  { id: 21, name: "Onion", calories: 40, protein: 1.1, carbs: 9, fats: 0.1, fiber: 1.7, sugar: 4.2, serving: "100g", category: "vegetables" },
  { id: 22, name: "Potato", calories: 77, protein: 2, carbs: 17, fats: 0.1, fiber: 2.2, sugar: 0.8, serving: "100g", category: "vegetables" },
  { id: 23, name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fats: 0.1, fiber: 3, sugar: 4.2, serving: "100g", category: "vegetables" },
  { id: 24, name: "Cauliflower", calories: 25, protein: 1.9, carbs: 5, fats: 0.3, fiber: 2, sugar: 1.9, serving: "100g", category: "vegetables" },
  { id: 25, name: "Green Beans", calories: 31, protein: 1.8, carbs: 7, fats: 0.2, fiber: 2.7, sugar: 3.3, serving: "100g", category: "vegetables" },
  { id: 26, name: "Cabbage", calories: 25, protein: 1.3, carbs: 6, fats: 0.1, fiber: 2.5, sugar: 3.2, serving: "100g", category: "vegetables" },
  { id: 27, name: "Beetroot", calories: 43, protein: 1.6, carbs: 10, fats: 0.2, fiber: 2.8, sugar: 6.8, serving: "100g", category: "vegetables" },
  { id: 28, name: "Okra (Bhindi)", calories: 33, protein: 1.9, carbs: 7, fats: 0.2, fiber: 3.2, sugar: 1.5, serving: "100g", category: "vegetables" },

  // Grains & Cereals
  { id: 29, name: "Basmati Rice (cooked)", calories: 121, protein: 2.7, carbs: 25, fats: 0.4, fiber: 0.4, sugar: 0.1, serving: "100g", category: "grains" },
  { id: 30, name: "Brown Rice (cooked)", calories: 111, protein: 2.6, carbs: 23, fats: 0.9, fiber: 1.8, sugar: 0.4, serving: "100g", category: "grains" },
  { id: 31, name: "Chapati/Roti", calories: 297, protein: 11, carbs: 51, fats: 7, fiber: 4.6, sugar: 2.7, serving: "100g", category: "grains" },
  { id: 32, name: "Naan", calories: 310, protein: 9, carbs: 56, fats: 6, fiber: 2.7, sugar: 5.1, serving: "100g", category: "grains" },
  { id: 33, name: "Paratha", calories: 320, protein: 6.5, carbs: 36, fats: 16, fiber: 3.5, sugar: 1.2, serving: "100g", category: "grains" },
  { id: 34, name: "Quinoa (cooked)", calories: 120, protein: 4.4, carbs: 22, fats: 1.9, fiber: 2.8, sugar: 0.9, serving: "100g", category: "grains" },
  { id: 35, name: "Oats", calories: 68, protein: 2.4, carbs: 12, fats: 1.4, fiber: 1.7, sugar: 0.3, serving: "100g", category: "grains" },
  { id: 36, name: "Whole Wheat Bread", calories: 247, protein: 13, carbs: 41, fats: 4.2, fiber: 6, sugar: 5.4, serving: "100g", category: "grains" },
  { id: 37, name: "White Bread", calories: 265, protein: 9, carbs: 49, fats: 3.2, fiber: 2.7, sugar: 5.7, serving: "100g", category: "grains" },
  { id: 38, name: "Pasta (cooked)", calories: 131, protein: 5, carbs: 25, fats: 1.1, fiber: 1.8, sugar: 0.6, serving: "100g", category: "grains" },

  // Proteins
  { id: 39, name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fats: 3.6, fiber: 0, sugar: 0, serving: "100g", category: "proteins" },
  { id: 40, name: "Chicken Thigh", calories: 209, protein: 26, carbs: 0, fats: 11, fiber: 0, sugar: 0, serving: "100g", category: "proteins" },
  { id: 41, name: "Mutton", calories: 294, protein: 25, carbs: 0, fats: 21, fiber: 0, sugar: 0, serving: "100g", category: "proteins" },
  { id: 42, name: "Fish (Rohu)", calories: 97, protein: 16, carbs: 0, fats: 3, fiber: 0, sugar: 0, serving: "100g", category: "proteins" },
  { id: 43, name: "Salmon", calories: 208, protein: 25, carbs: 0, fats: 12, fiber: 0, sugar: 0, serving: "100g", category: "proteins" },
  { id: 44, name: "Tuna", calories: 144, protein: 30, carbs: 0, fats: 1, fiber: 0, sugar: 0, serving: "100g", category: "proteins" },
  { id: 45, name: "Prawns", calories: 99, protein: 18, carbs: 0.9, fats: 1.4, fiber: 0, sugar: 0, serving: "100g", category: "proteins" },
  { id: 46, name: "Eggs", calories: 155, protein: 13, carbs: 1.1, fats: 11, fiber: 0, sugar: 1.1, serving: "100g", category: "proteins" },
  { id: 47, name: "Paneer", calories: 265, protein: 18, carbs: 1.2, fats: 20, fiber: 0, sugar: 1.2, serving: "100g", category: "proteins" },
  { id: 48, name: "Tofu", calories: 76, protein: 8, carbs: 1.9, fats: 4.8, fiber: 0.3, sugar: 0.6, serving: "100g", category: "proteins" },
  { id: 49, name: "Turkey Breast", calories: 135, protein: 30, carbs: 0, fats: 1, fiber: 0, sugar: 0, serving: "100g", category: "proteins" },

  // Dairy
  { id: 50, name: "Milk (Full Fat)", calories: 61, protein: 3.2, carbs: 4.8, fats: 3.3, fiber: 0, sugar: 4.8, serving: "100ml", category: "dairy" },
  { id: 51, name: "Milk (2%)", calories: 50, protein: 3.3, carbs: 4.8, fats: 2, fiber: 0, sugar: 4.8, serving: "100ml", category: "dairy" },
  { id: 52, name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fats: 0.4, fiber: 0, sugar: 3.6, serving: "100g", category: "dairy" },
  { id: 53, name: "Curd/Dahi", calories: 60, protein: 3.1, carbs: 4.7, fats: 3.3, fiber: 0, sugar: 4.7, serving: "100g", category: "dairy" },
  { id: 54, name: "Cottage Cheese", calories: 98, protein: 11, carbs: 3.4, fats: 4.3, fiber: 0, sugar: 2.7, serving: "100g", category: "dairy" },
  { id: 55, name: "Cheddar Cheese", calories: 402, protein: 25, carbs: 1.3, fats: 33, fiber: 0, sugar: 0.5, serving: "100g", category: "dairy" },
  { id: 56, name: "Mozzarella", calories: 300, protein: 22, carbs: 2.2, fats: 22, fiber: 0, sugar: 1, serving: "100g", category: "dairy" },
  { id: 57, name: "Butter", calories: 717, protein: 0.9, carbs: 0.1, fats: 81, fiber: 0, sugar: 0.1, serving: "100g", category: "dairy" },
  { id: 58, name: "Ghee", calories: 900, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, serving: "100g", category: "dairy" },

  // Nuts & Seeds
  { id: 59, name: "Almonds", calories: 579, protein: 21, carbs: 22, fats: 50, fiber: 12, sugar: 4.4, serving: "100g", category: "nuts" },
  { id: 60, name: "Walnuts", calories: 654, protein: 15, carbs: 14, fats: 65, fiber: 6.7, sugar: 2.6, serving: "100g", category: "nuts" },
  { id: 61, name: "Cashews", calories: 553, protein: 18, carbs: 30, fats: 44, fiber: 3.3, sugar: 5.9, serving: "100g", category: "nuts" },
  { id: 62, name: "Peanuts", calories: 567, protein: 26, carbs: 16, fats: 49, fiber: 8.5, sugar: 4.7, serving: "100g", category: "nuts" },
  { id: 63, name: "Peanut Butter", calories: 588, protein: 25, carbs: 20, fats: 50, fiber: 6, sugar: 9.2, serving: "100g", category: "nuts" },
  { id: 64, name: "Pistachios", calories: 560, protein: 20, carbs: 28, fats: 45, fiber: 10, sugar: 7.7, serving: "100g", category: "nuts" },
  { id: 65, name: "Sunflower Seeds", calories: 584, protein: 21, carbs: 20, fats: 51, fiber: 8.6, sugar: 2.6, serving: "100g", category: "nuts" },
  { id: 66, name: "Pumpkin Seeds", calories: 559, protein: 19, carbs: 54, fats: 19, fiber: 18, sugar: 1.4, serving: "100g", category: "nuts" },

  // Legumes
  { id: 67, name: "Black Beans", calories: 132, protein: 8.9, carbs: 24, fats: 0.5, fiber: 8.7, sugar: 0.3, serving: "100g", category: "proteins" },
  { id: 68, name: "Chickpeas", calories: 164, protein: 8.9, carbs: 27, fats: 2.6, fiber: 7.6, sugar: 4.8, serving: "100g", category: "proteins" },
  { id: 69, name: "Lentils (Dal)", calories: 116, protein: 9, carbs: 20, fats: 0.4, fiber: 7.9, sugar: 1.8, serving: "100g", category: "proteins" },
  { id: 70, name: "Kidney Beans (Rajma)", calories: 127, protein: 8.7, carbs: 23, fats: 0.5, fiber: 6.4, sugar: 0.3, serving: "100g", category: "proteins" },
  { id: 71, name: "Green Peas", calories: 81, protein: 5.4, carbs: 14, fats: 0.4, fiber: 5.7, sugar: 5.7, serving: "100g", category: "vegetables" },

  // Beverages
  { id: 72, name: "Green Tea", calories: 1, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0, serving: "100ml", category: "beverages" },
  { id: 73, name: "Black Tea", calories: 1, protein: 0, carbs: 0.3, fats: 0, fiber: 0, sugar: 0, serving: "100ml", category: "beverages" },
  { id: 74, name: "Coffee (black)", calories: 2, protein: 0.3, carbs: 0, fats: 0, fiber: 0, sugar: 0, serving: "100ml", category: "beverages" },
  { id: 75, name: "Orange Juice", calories: 45, protein: 0.7, carbs: 10, fats: 0.2, fiber: 0.2, sugar: 8.4, serving: "100ml", category: "beverages" },
  { id: 76, name: "Apple Juice", calories: 46, protein: 0.1, carbs: 11, fats: 0.1, fiber: 0.2, sugar: 9.6, serving: "100ml", category: "beverages" },
  { id: 77, name: "Coconut Water", calories: 19, protein: 0.7, carbs: 3.7, fats: 0.2, fiber: 1.1, sugar: 2.6, serving: "100ml", category: "beverages" },

  // Snacks
  { id: 78, name: "Popcorn", calories: 387, protein: 12, carbs: 78, fats: 5, fiber: 15, sugar: 0.9, serving: "100g", category: "snacks" },
  { id: 79, name: "Potato Chips", calories: 536, protein: 7, carbs: 53, fats: 34, fiber: 4.8, sugar: 0.3, serving: "100g", category: "snacks" },
  { id: 80, name: "Biscuits", calories: 502, protein: 6.1, carbs: 62, fats: 25, fiber: 2.1, sugar: 22, serving: "100g", category: "snacks" },
  { id: 81, name: "Namkeen", calories: 540, protein: 15, carbs: 45, fats: 35, fiber: 5, sugar: 3, serving: "100g", category: "snacks" },
  { id: 82, name: "Samosa", calories: 308, protein: 4.7, carbs: 28, fats: 20, fiber: 2.4, sugar: 1.2, serving: "100g", category: "snacks" },
  { id: 83, name: "Pakora", calories: 360, protein: 6, carbs: 35, fats: 22, fiber: 3, sugar: 2, serving: "100g", category: "snacks" },

  // Indian Meals
  { id: 84, name: "Chicken Biryani", calories: 200, protein: 12, carbs: 25, fats: 6, fiber: 1.5, sugar: 2, serving: "100g", category: "meals" },
  { id: 85, name: "Mutton Biryani", calories: 250, protein: 15, carbs: 22, fats: 12, fiber: 1.2, sugar: 1.8, serving: "100g", category: "meals" },
  { id: 86, name: "Veg Biryani", calories: 180, protein: 4, carbs: 35, fats: 4, fiber: 2.5, sugar: 3, serving: "100g", category: "meals" },
  { id: 87, name: "Dal Tadka", calories: 120, protein: 6, carbs: 18, fats: 3, fiber: 4, sugar: 2, serving: "100g", category: "meals" },
  { id: 88, name: "Butter Chicken", calories: 180, protein: 20, carbs: 5, fats: 9, fiber: 1, sugar: 4, serving: "100g", category: "meals" },
  { id: 89, name: "Palak Paneer", calories: 160, protein: 8, carbs: 8, fats: 12, fiber: 3, sugar: 4, serving: "100g", category: "meals" },
  { id: 90, name: "Chole", calories: 140, protein: 7, carbs: 22, fats: 3, fiber: 6, sugar: 3, serving: "100g", category: "meals" },
  { id: 91, name: "Aloo Gobi", calories: 90, protein: 3, carbs: 15, fats: 2.5, fiber: 3, sugar: 4, serving: "100g", category: "meals" },
  { id: 92, name: "Rajma", calories: 130, protein: 8, carbs: 20, fats: 2, fiber: 7, sugar: 2, serving: "100g", category: "meals" },
  { id: 93, name: "Kadhi", calories: 85, protein: 3, carbs: 8, fats: 4, fiber: 1, sugar: 5, serving: "100g", category: "meals" },

  // Chinese
  { id: 94, name: "Fried Rice", calories: 163, protein: 4, carbs: 20, fats: 7, fiber: 1, sugar: 1, serving: "100g", category: "meals" },
  { id: 95, name: "Chow Mein", calories: 198, protein: 6, carbs: 27, fats: 8, fiber: 2, sugar: 3, serving: "100g", category: "meals" },
  { id: 96, name: "Manchurian", calories: 220, protein: 8, carbs: 25, fats: 10, fiber: 2, sugar: 8, serving: "100g", category: "meals" },
  { id: 97, name: "Sweet & Sour", calories: 240, protein: 12, carbs: 30, fats: 8, fiber: 1.5, sugar: 20, serving: "100g", category: "meals" },
  { id: 98, name: "Spring Rolls", calories: 140, protein: 4, carbs: 18, fats: 6, fiber: 2, sugar: 2, serving: "100g", category: "snacks" },

  // Italian
  { id: 99, name: "Margherita Pizza", calories: 266, protein: 11, carbs: 33, fats: 10, fiber: 2.3, sugar: 3.6, serving: "100g", category: "fast-food" },
  { id: 100, name: "Pepperoni Pizza", calories: 298, protein: 13, carbs: 36, fats: 12, fiber: 2.5, sugar: 4.1, serving: "100g", category: "fast-food" },
  { id: 101, name: "Pasta Carbonara", calories: 370, protein: 15, carbs: 35, fats: 20, fiber: 2, sugar: 2, serving: "100g", category: "meals" },
  { id: 102, name: "Lasagna", calories: 135, protein: 8, carbs: 11, fats: 6, fiber: 1, sugar: 4, serving: "100g", category: "meals" },
  { id: 103, name: "Garlic Bread", calories: 350, protein: 9, carbs: 45, fats: 15, fiber: 3, sugar: 3, serving: "100g", category: "snacks" },

  // Fast Food
  { id: 104, name: "Burger", calories: 295, protein: 17, carbs: 29, fats: 14, fiber: 2.4, sugar: 4, serving: "100g", category: "fast-food" },
  { id: 105, name: "French Fries", calories: 365, protein: 4, carbs: 63, fats: 17, fiber: 3.8, sugar: 0.3, serving: "100g", category: "fast-food" },
  { id: 106, name: "Hot Dog", calories: 290, protein: 10, carbs: 2, fats: 26, fiber: 0, sugar: 1, serving: "100g", category: "fast-food" },
  { id: 107, name: "Fried Chicken", calories: 320, protein: 19, carbs: 8, fats: 24, fiber: 0.5, sugar: 0, serving: "100g", category: "fast-food" },
  { id: 108, name: "Sandwich", calories: 250, protein: 12, carbs: 30, fats: 10, fiber: 4, sugar: 4, serving: "100g", category: "fast-food" },
  { id: 109, name: "Tacos", calories: 226, protein: 9, carbs: 18, fats: 13, fiber: 3, sugar: 1, serving: "100g", category: "fast-food" },
  { id: 110, name: "Donuts", calories: 452, protein: 5, carbs: 51, fats: 25, fiber: 1.4, sugar: 23, serving: "100g", category: "snacks" },

  // More Indian Dishes
  { id: 111, name: "Idli", calories: 58, protein: 2, carbs: 12, fats: 0.1, fiber: 0.6, sugar: 0.1, serving: "100g", category: "meals" },
  { id: 112, name: "Dosa", calories: 168, protein: 4, carbs: 25, fats: 6, fiber: 1.2, sugar: 1, serving: "100g", category: "meals" },
  { id: 113, name: "Upma", calories: 76, protein: 2, carbs: 13, fats: 2, fiber: 1, sugar: 0.5, serving: "100g", category: "meals" },
  { id: 114, name: "Poha", calories: 76, protein: 1.8, carbs: 17, fats: 0.2, fiber: 0.2, sugar: 0.1, serving: "100g", category: "meals" },
  { id: 115, name: "Paratha (Stuffed)", calories: 320, protein: 8, carbs: 40, fats: 15, fiber: 4, sugar: 2, serving: "100g", category: "grains" },
  { id: 116, name: "Puri", calories: 501, protein: 9, carbs: 55, fats: 27, fiber: 3, sugar: 1, serving: "100g", category: "grains" },
  { id: 117, name: "Bhel Puri", calories: 300, protein: 8, carbs: 45, fats: 10, fiber: 5, sugar: 8, serving: "100g", category: "snacks" },
  { id: 118, name: "Pav Bhaji", calories: 150, protein: 4, carbs: 20, fats: 6, fiber: 3, sugar: 5, serving: "100g", category: "meals" },
  { id: 119, name: "Vada Pav", calories: 286, protein: 6, carbs: 35, fats: 14, fiber: 2, sugar: 3, serving: "100g", category: "fast-food" },
  { id: 120, name: "Dhokla", calories: 160, protein: 4, carbs: 25, fats: 5, fiber: 2, sugar: 8, serving: "100g", category: "snacks" },

  // Sweets & Desserts
  { id: 121, name: "Gulab Jamun", calories: 387, protein: 4, carbs: 52, fats: 18, fiber: 0.5, sugar: 45, serving: "100g", category: "snacks" },
  { id: 122, name: "Rasgulla", calories: 186, protein: 4, carbs: 32, fats: 5, fiber: 0, sugar: 30, serving: "100g", category: "snacks" },
  { id: 123, name: "Jalebi", calories: 150, protein: 1, carbs: 28, fats: 4, fiber: 0, sugar: 25, serving: "100g", category: "snacks" },
  { id: 124, name: "Laddu", calories: 418, protein: 6, carbs: 60, fats: 17, fiber: 2, sugar: 45, serving: "100g", category: "snacks" },
  { id: 125, name: "Barfi", calories: 380, protein: 8, carbs: 45, fats: 18, fiber: 1, sugar: 40, serving: "100g", category: "snacks" },
  { id: 126, name: "Ice Cream", calories: 207, protein: 3.5, carbs: 24, fats: 11, fiber: 0.7, sugar: 21, serving: "100g", category: "snacks" },
  { id: 127, name: "Chocolate", calories: 546, protein: 5, carbs: 61, fats: 31, fiber: 7, sugar: 48, serving: "100g", category: "snacks" },
  { id: 128, name: "Cake", calories: 257, protein: 4, carbs: 46, fats: 7, fiber: 1.2, sugar: 35, serving: "100g", category: "snacks" },

  // More Vegetables
  { id: 129, name: "Mushrooms", calories: 22, protein: 3.1, carbs: 3.3, fats: 0.3, fiber: 1, sugar: 2, serving: "100g", category: "vegetables" },
  { id: 130, name: "Eggplant", calories: 25, protein: 1, carbs: 6, fats: 0.2, fiber: 3, sugar: 3.5, serving: "100g", category: "vegetables" },
  { id: 131, name: "Zucchini", calories: 17, protein: 1.2, carbs: 3.1, fats: 0.3, fiber: 1, sugar: 2.5, serving: "100g", category: "vegetables" },
  { id: 132, name: "Pumpkin", calories: 26, protein: 1, carbs: 7, fats: 0.1, fiber: 0.5, sugar: 2.8, serving: "100g", category: "vegetables" },
  { id: 133, name: "Radish", calories: 16, protein: 0.7, carbs: 2, fats: 0.1, fiber: 1.6, sugar: 1.9, serving: "100g", category: "vegetables" },
  { id: 134, name: "Turnip", calories: 28, protein: 0.9, carbs: 6, fats: 0.1, fiber: 1.8, sugar: 3.8, serving: "100g", category: "vegetables" },

  // More Fruits
  { id: 135, name: "Lemon", calories: 29, protein: 1.1, carbs: 9, fats: 0.3, fiber: 2.8, sugar: 1.5, serving: "100g", category: "fruits" },
  { id: 136, name: "Lime", calories: 30, protein: 0.7, carbs: 11, fats: 0.2, fiber: 2.8, sugar: 1.7, serving: "100g", category: "fruits" },
  { id: 137, name: "Coconut", calories: 354, protein: 3.3, carbs: 15, fats: 33, fiber: 9, sugar: 6.2, serving: "100g", category: "fruits" },
  { id: 138, name: "Dates", calories: 277, protein: 1.8, carbs: 75, fats: 0.2, fiber: 6.7, sugar: 66, serving: "100g", category: "fruits" },
  { id: 139, name: "Figs", calories: 74, protein: 0.8, carbs: 19, fats: 0.3, fiber: 2.9, sugar: 16, serving: "100g", category: "fruits" },
  { id: 140, name: "Raisins", calories: 299, protein: 3.1, carbs: 79, fats: 0.5, fiber: 3.7, sugar: 59, serving: "100g", category: "fruits" },

  // Condiments & Spices
  { id: 141, name: "Olive Oil", calories: 884, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, serving: "100ml", category: "nuts" },
  { id: 142, name: "Coconut Oil", calories: 862, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, serving: "100ml", category: "nuts" },
  { id: 143, name: "Mustard Oil", calories: 884, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, serving: "100ml", category: "nuts" },
  { id: 144, name: "Honey", calories: 304, protein: 0.3, carbs: 82, fats: 0, fiber: 0.2, sugar: 82, serving: "100g", category: "snacks" },
  { id: 145, name: "Sugar", calories: 387, protein: 0, carbs: 100, fats: 0, fiber: 0, sugar: 100, serving: "100g", category: "snacks" },
  { id: 146, name: "Jaggery", calories: 383, protein: 0.4, carbs: 98, fats: 0.1, fiber: 0, sugar: 85, serving: "100g", category: "snacks" },

  // More Proteins
  { id: 147, name: "Soya Chunks", calories: 345, protein: 52, carbs: 33, fats: 0.5, fiber: 13, sugar: 7, serving: "100g", category: "proteins" },
  { id: 148, name: "Tempeh", calories: 190, protein: 19, carbs: 9, fats: 11, fiber: 9, sugar: 0, serving: "100g", category: "proteins" },
  { id: 149, name: "Seitan", calories: 370, protein: 75, carbs: 14, fats: 1.9, fiber: 6, sugar: 0, serving: "100g", category: "proteins" },
  { id: 150, name: "Cottage Cheese (Low Fat)", calories: 72, protein: 12, carbs: 4.3, fats: 1, fiber: 0, sugar: 4.1, serving: "100g", category: "dairy" },

  // Breakfast Items
  { id: 151, name: "Cornflakes", calories: 357, protein: 7.5, carbs: 84, fats: 0.9, fiber: 3, sugar: 8.3, serving: "100g", category: "grains" },
  { id: 152, name: "Muesli", calories: 325, protein: 8.2, carbs: 66, fats: 5.6, fiber: 7.7, sugar: 26, serving: "100g", category: "grains" },
  { id: 153, name: "Granola", calories: 471, protein: 13, carbs: 64, fats: 20, fiber: 7, sugar: 24, serving: "100g", category: "grains" },
  { id: 154, name: "Pancakes", calories: 227, protein: 6, carbs: 28, fats: 10, fiber: 1.4, sugar: 6, serving: "100g", category: "meals" },
  { id: 155, name: "Waffles", calories: 291, protein: 7, carbs: 37, fats: 13, fiber: 1.7, sugar: 8, serving: "100g", category: "meals" },

  // Soups
  { id: 156, name: "Tomato Soup", calories: 16, protein: 0.9, carbs: 3.3, fats: 0.2, fiber: 0.4, sugar: 2.6, serving: "100ml", category: "meals" },
  { id: 157, name: "Chicken Soup", calories: 38, protein: 4.8, carbs: 2.9, fats: 1.2, fiber: 0.5, sugar: 1.1, serving: "100ml", category: "meals" },
  { id: 158, name: "Vegetable Soup", calories: 12, protein: 0.6, carbs: 2.4, fats: 0.1, fiber: 0.5, sugar: 1.5, serving: "100ml", category: "meals" },
  { id: 159, name: "Lentil Soup", calories: 116, protein: 9, carbs: 20, fats: 0.4, fiber: 7.9, sugar: 1.8, serving: "100ml", category: "meals" },

  // Salads
  { id: 160, name: "Green Salad", calories: 15, protein: 1.4, carbs: 2.9, fats: 0.2, fiber: 1.6, sugar: 1.8, serving: "100g", category: "vegetables" },
  { id: 161, name: "Caesar Salad", calories: 470, protein: 27, carbs: 7, fats: 40, fiber: 3, sugar: 3, serving: "100g", category: "meals" },
  { id: 162, name: "Fruit Salad", calories: 50, protein: 0.6, carbs: 13, fats: 0.2, fiber: 2, sugar: 11, serving: "100g", category: "fruits" },
  { id: 163, name: "Coleslaw", calories: 152, protein: 1.2, carbs: 7, fats: 14, fiber: 2.5, sugar: 5, serving: "100g", category: "vegetables" },

  // Smoothies & Shakes
  { id: 164, name: "Banana Smoothie", calories: 95, protein: 2.5, carbs: 22, fats: 0.5, fiber: 2.5, sugar: 18, serving: "100ml", category: "beverages" },
  { id: 165, name: "Mango Smoothie", calories: 60, protein: 1, carbs: 15, fats: 0.2, fiber: 1.5, sugar: 13, serving: "100ml", category: "beverages" },
  { id: 166, name: "Protein Shake", calories: 103, protein: 20, carbs: 3, fats: 1.5, fiber: 1, sugar: 2, serving: "100ml", category: "beverages" },
  { id: 167, name: "Green Smoothie", calories: 45, protein: 2, carbs: 9, fats: 0.5, fiber: 3, sugar: 6, serving: "100ml", category: "beverages" },

  // Street Food
  { id: 168, name: "Chaat", calories: 200, protein: 5, carbs: 30, fats: 7, fiber: 4, sugar: 8, serving: "100g", category: "snacks" },
  { id: 169, name: "Gol Gappa", calories: 329, protein: 12, carbs: 54, fats: 8, fiber: 4, sugar: 2, serving: "100g", category: "snacks" },
  { id: 170, name: "Aloo Tikki", calories: 168, protein: 3, carbs: 25, fats: 6, fiber: 2, sugar: 2, serving: "100g", category: "snacks" },
  { id: 171, name: "Kachori", calories: 418, protein: 8, carbs: 45, fats: 23, fiber: 3, sugar: 2, serving: "100g", category: "snacks" },
  { id: 172, name: "Momos", calories: 206, protein: 8, carbs: 28, fats: 7, fiber: 2, sugar: 2, serving: "100g", category: "meals" },

  // Regional Dishes
  { id: 173, name: "Hyderabadi Biryani", calories: 220, protein: 14, carbs: 24, fats: 8, fiber: 1.5, sugar: 2, serving: "100g", category: "meals" },
  { id: 174, name: "Kolkata Biryani", calories: 200, protein: 12, carbs: 26, fats: 6, fiber: 1.2, sugar: 3, serving: "100g", category: "meals" },
  { id: 175, name: "Lucknowi Biryani", calories: 210, protein: 13, carbs: 25, fats: 7, fiber: 1.3, sugar: 2.5, serving: "100g", category: "meals" },
  { id: 176, name: "Masala Dosa", calories: 180, protein: 5, carbs: 28, fats: 6, fiber: 2, sugar: 2, serving: "100g", category: "meals" },
  { id: 177, name: "Rava Dosa", calories: 160, protein: 4, carbs: 25, fats: 5, fiber: 1.5, sugar: 1.5, serving: "100g", category: "meals" },
  { id: 178, name: "Uttapam", calories: 85, protein: 2.5, carbs: 16, fats: 1.5, fiber: 1, sugar: 1, serving: "100g", category: "meals" },
  { id: 179, name: "Appam", calories: 106, protein: 1.6, carbs: 24, fats: 0.2, fiber: 0.2, sugar: 0.1, serving: "100g", category: "meals" },
  { id: 180, name: "Puttu", calories: 97, protein: 2, carbs: 22, fats: 0.2, fiber: 0.4, sugar: 0.1, serving: "100g", category: "meals" },

  // International Cuisines
  { id: 181, name: "Sushi", calories: 200, protein: 9, carbs: 20, fats: 10, fiber: 3, sugar: 3, serving: "100g", category: "meals" },
  { id: 182, name: "Ramen", calories: 436, protein: 14, carbs: 65, fats: 14, fiber: 4, sugar: 5, serving: "100g", category: "meals" },
  { id: 183, name: "Pad Thai", calories: 153, protein: 5, carbs: 23, fats: 5, fiber: 1, sugar: 8, serving: "100g", category: "meals" },
  { id: 184, name: "Falafel", calories: 333, protein: 13, carbs: 32, fats: 18, fiber: 4.9, sugar: 1.4, serving: "100g", category: "meals" },
  { id: 185, name: "Hummus", calories: 166, protein: 8, carbs: 14, fats: 10, fiber: 6, sugar: 0.3, serving: "100g", category: "snacks" },
  { id: 186, name: "Shawarma", calories: 250, protein: 15, carbs: 20, fats: 12, fiber: 2, sugar: 3, serving: "100g", category: "fast-food" },
  { id: 187, name: "Kebab", calories: 291, protein: 26, carbs: 3, fats: 19, fiber: 0.5, sugar: 1, serving: "100g", category: "meals" },
  { id: 188, name: "Paella", calories: 172, protein: 8, carbs: 20, fats: 7, fiber: 1, sugar: 2, serving: "100g", category: "meals" },
  { id: 189, name: "Risotto", calories: 174, protein: 4, carbs: 28, fats: 5, fiber: 1.3, sugar: 1, serving: "100g", category: "meals" },
  { id: 190, name: "Gnocchi", calories: 131, protein: 3.5, carbs: 28, fats: 0.9, fiber: 1.7, sugar: 1.2, serving: "100g", category: "meals" },

  // Healthy Options
  { id: 191, name: "Chia Seeds", calories: 486, protein: 17, carbs: 42, fats: 31, fiber: 34, sugar: 0, serving: "100g", category: "nuts" },
  { id: 192, name: "Flax Seeds", calories: 534, protein: 18, carbs: 29, fats: 42, fiber: 27, sugar: 1.6, serving: "100g", category: "nuts" },
  { id: 193, name: "Hemp Seeds", calories: 553, protein: 31, carbs: 8.7, fats: 49, fiber: 4, sugar: 1.5, serving: "100g", category: "nuts" },
  { id: 194, name: "Spirulina", calories: 290, protein: 57, carbs: 24, fats: 8, fiber: 4, sugar: 3.1, serving: "100g", category: "vegetables" },
  { id: 195, name: "Wheatgrass", calories: 198, protein: 22, carbs: 42, fats: 3.3, fiber: 33, sugar: 0, serving: "100g", category: "vegetables" },
  { id: 196, name: "Kale", calories: 49, protein: 4.3, carbs: 9, fats: 0.9, fiber: 3.6, sugar: 2.3, serving: "100g", category: "vegetables" },
  { id: 197, name: "Arugula", calories: 25, protein: 2.6, carbs: 3.7, fats: 0.7, fiber: 1.6, sugar: 2, serving: "100g", category: "vegetables" },
  { id: 198, name: "Swiss Chard", calories: 19, protein: 1.8, carbs: 3.7, fats: 0.2, fiber: 1.6, sugar: 1.1, serving: "100g", category: "vegetables" },
  { id: 199, name: "Bok Choy", calories: 13, protein: 1.5, carbs: 2.2, fats: 0.2, fiber: 1, sugar: 1.2, serving: "100g", category: "vegetables" },
  { id: 200, name: "Collard Greens", calories: 32, protein: 3, carbs: 6, fats: 0.6, fiber: 4, sugar: 0.5, serving: "100g", category: "vegetables" }
];

function Calories() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    height: 170,
    weight: 70,
    age: 25,
    gender: 'male',
    activityLevel: 'moderate'
  });

  const [consumedFoods, setConsumedFoods] = useState<ConsumedFood[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');

  // Calculate BMI
  const calculateBMI = () => {
    const heightInM = userProfile.height / 100;
    return userProfile.weight / (heightInM * heightInM);
  };

  // Calculate daily calorie needs
  const calculateDailyCalories = () => {
    const { weight, height, age, gender, activityLevel } = userProfile;
    
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'very-active': 1.9
    };

    return Math.round(bmr * activityMultipliers[activityLevel]);
  };

  const bmi = calculateBMI();
  const dailyCaloriesGoal = calculateDailyCalories();

  // Calculate totals by meal type
  const calculateMealTotals = (mealType: string) => {
    const mealFoods = consumedFoods.filter(food => food.mealType === mealType);
    return mealFoods.reduce((totals, food) => ({
      calories: totals.calories + (food.calories * food.quantity),
      protein: totals.protein + (food.protein * food.quantity),
      carbs: totals.carbs + (food.carbs * food.quantity),
      fats: totals.fats + (food.fats * food.quantity),
      fiber: totals.fiber + (food.fiber * food.quantity),
      sugar: totals.sugar + (food.sugar * food.quantity)
    }), { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0 });
  };

  // Calculate overall totals
  const calculateTotals = () => {
    return consumedFoods.reduce((totals, food) => ({
      calories: totals.calories + (food.calories * food.quantity),
      protein: totals.protein + (food.protein * food.quantity),
      carbs: totals.carbs + (food.carbs * food.quantity),
      fats: totals.fats + (food.fats * food.quantity),
      fiber: totals.fiber + (food.fiber * food.quantity),
      sugar: totals.sugar + (food.sugar * food.quantity)
    }), { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0 });
  };

  const totals = calculateTotals();
  const breakfastTotals = calculateMealTotals('breakfast');
  const lunchTotals = calculateMealTotals('lunch');
  const dinnerTotals = calculateMealTotals('dinner');
  const snacksTotals = calculateMealTotals('snacks');

  // Filter foods
  const filteredFoods = foodDatabase.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addFood = () => {
    if (!selectedFood) return;
    
    const consumedFood: ConsumedFood = {
      ...selectedFood,
      quantity,
      consumedAt: new Date(),
      mealType: selectedMealType
    };
    
    setConsumedFoods([...consumedFoods, consumedFood]);
    setShowFoodModal(false);
    setSelectedFood(null);
    setQuantity(1);
    setSearchTerm('');
  };

  const removeFood = (index: number) => {
    const newFoods = consumedFoods.filter((_, i) => i !== index);
    setConsumedFoods(newFoods);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { category: 'Obese', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const bmiInfo = getBMICategory(bmi);
  const calorieProgress = (totals.calories / dailyCaloriesGoal) * 100;

  const categories = [
    { id: 'all', name: 'All Foods', icon: ChefHat },
    { id: 'fruits', name: 'Fruits', icon: Apple },
    { id: 'vegetables', name: 'Vegetables', icon: Salad },
    { id: 'grains', name: 'Grains', icon: Wheat },
    { id: 'proteins', name: 'Proteins', icon: Beef },
    { id: 'dairy', name: 'Dairy', icon: Scale },
    { id: 'nuts', name: 'Nuts & Oils', icon: Scale },
    { id: 'beverages', name: 'Beverages', icon: Coffee },
    { id: 'snacks', name: 'Snacks', icon: Cookie },
    { id: 'meals', name: 'Meals', icon: Pizza },
    { id: 'fast-food', name: 'Fast Food', icon: Pizza }
  ];

  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', icon: Coffee, color: 'from-orange-400 to-yellow-500' },
    { id: 'lunch', name: 'Lunch', icon: Sun, color: 'from-green-400 to-emerald-500' },
    { id: 'dinner', name: 'Dinner', icon: Moon, color: 'from-purple-400 to-indigo-500' },
    { id: 'snacks', name: 'Snacks', icon: Cookie, color: 'from-pink-400 to-rose-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8 mt-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full mb-4 shadow-lg">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
            NutriTracker Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your complete nutrition companion with smart meal tracking, BMI analysis, and personalized calorie goals
          </p>
        </div>

        {/* User Profile & BMI Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Height (cm)</label>
                <input
                  type="number"
                  value={userProfile.height}
                  onChange={(e) => setUserProfile({...userProfile, height: Number(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Weight (kg)</label>
                <input
                  type="number"
                  value={userProfile.weight}
                  onChange={(e) => setUserProfile({...userProfile, weight: Number(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Age</label>
                <input
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile({...userProfile, age: Number(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Gender</label>
                <select
                  value={userProfile.gender}
                  onChange={(e) => setUserProfile({...userProfile, gender: e.target.value as 'male' | 'female'})}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Activity Level</label>
              <select
                value={userProfile.activityLevel}
                onChange={(e) => setUserProfile({...userProfile, activityLevel: e.target.value as any})}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50"
              >
                <option value="sedentary">🛋️ Sedentary (little/no exercise)</option>
                <option value="light">🚶 Light (light exercise 1-3 days/week)</option>
                <option value="moderate">🏃 Moderate (moderate exercise 3-5 days/week)</option>
                <option value="active">💪 Active (hard exercise 6-7 days/week)</option>
                <option value="very-active">🏋️ Very Active (very hard exercise, physical job)</option>
              </select>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Health Metrics</h2>
            </div>
            
            <div className="space-y-6">
              <div className={`${bmiInfo.bgColor} rounded-2xl p-6 border-2 border-opacity-20`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-gray-700">Body Mass Index</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${bmiInfo.color} bg-white/80`}>
                    {bmiInfo.category}
                  </span>
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{bmi.toFixed(1)}</div>
                <div className="text-sm text-gray-600">
                  {bmi < 18.5 ? 'Consider gaining weight' : 
                   bmi < 25 ? 'Healthy weight range' : 
                   bmi < 30 ? 'Consider losing weight' : 'Consult healthcare provider'}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 border-2 border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-gray-700">Daily Calorie Goal</span>
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{dailyCaloriesGoal}</div>
                <div className="text-sm text-gray-600">kcal per day</div>
              </div>
            </div>
          </div>
        </div>

        {/* Calorie Progress */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Today's Progress</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-gray-700">Calories Consumed</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-800">{totals.calories.toFixed(0)}</span>
                  <span className="text-lg text-gray-600"> / {dailyCaloriesGoal} kcal</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gradient-to-r from-pink-100 to-rose-100 rounded-full h-6 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-6 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
                    style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">0</span>
                  <span className={`text-sm font-bold ${calorieProgress > 100 ? 'text-red-500' : 'text-green-600'}`}>
                    {calorieProgress.toFixed(1)}%
                  </span>
                  <span className="text-sm text-gray-500">{dailyCaloriesGoal}</span>
                </div>
              </div>
              {calorieProgress > 100 && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">
                    ⚠️ You've exceeded your daily calorie goal by {(totals.calories - dailyCaloriesGoal).toFixed(0)} kcal
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Meal Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Meal Breakdown</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mealTypes.map((meal) => {
              const mealTotals = calculateMealTotals(meal.id);
              const MealIcon = meal.icon;
              return (
                <div key={meal.id} className={`bg-gradient-to-br ${meal.color} rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200`}>
                  <div className="flex items-center justify-between mb-4">
                    <MealIcon className="w-8 h-8" />
                    <span className="text-lg font-bold">{meal.name}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">{mealTotals.calories.toFixed(0)}</div>
                    <div className="text-sm opacity-90">kcal</div>
                    <div className="text-xs opacity-75">
                      P: {mealTotals.protein.toFixed(1)}g | C: {mealTotals.carbs.toFixed(1)}g | F: {mealTotals.fats.toFixed(1)}g
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Food Search & Add */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Food</h2>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Food Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                          : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                      }`}
                    >
                      <CategoryIcon className="w-4 h-4 mr-2" />
                      {category.name}
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.slice(6).map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                          : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                      }`}
                    >
                      <CategoryIcon className="w-4 h-4 mr-2" />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search from 200+ foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50 text-lg"
              />
            </div>
            
            {/* Food List */}
            <div className="max-h-80 overflow-y-auto space-y-3 custom-scrollbar">
              {filteredFoods.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No foods found. Try a different search term or category.</p>
                </div>
              ) : (
                filteredFoods.map((food) => (
                  <div
                    key={food.id}
                    onClick={() => {
                      setSelectedFood(food);
                      setShowFoodModal(true);
                    }}
                    className="p-4 border-2 border-pink-100 rounded-xl hover:border-pink-300 hover:bg-pink-50 cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-lg">{food.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {food.calories} kcal • {food.protein}g protein • {food.serving}
                        </div>
                        <div className="flex items-center mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            food.category === 'fruits' ? 'bg-red-100 text-red-700' :
                            food.category === 'vegetables' ? 'bg-green-100 text-green-700' :
                            food.category === 'grains' ? 'bg-yellow-100 text-yellow-700' :
                            food.category === 'proteins' ? 'bg-blue-100 text-blue-700' :
                            food.category === 'dairy' ? 'bg-purple-100 text-purple-700' :
                            food.category === 'nuts' ? 'bg-orange-100 text-orange-700' :
                            food.category === 'beverages' ? 'bg-cyan-100 text-cyan-700' :
                            food.category === 'snacks' ? 'bg-pink-100 text-pink-700' :
                            food.category === 'meals' ? 'bg-indigo-100 text-indigo-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {food.category}
                          </span>
                        </div>
                      </div>
                      <Plus className="w-5 h-5 text-pink-500 ml-3 flex-shrink-0" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Foods</h2>
            
            {/* Meal Type Tabs */}
            <div className="flex space-x-2 mb-6 bg-pink-50 p-2 rounded-xl">
              {mealTypes.map((meal) => {
                const MealIcon = meal.icon;
                const mealFoods = consumedFoods.filter(food => food.mealType === meal.id);
                return (
                  <button
                    key={meal.id}
                    onClick={() => setSelectedMealType(meal.id as any)}
                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedMealType === meal.id
                        ? 'bg-white shadow-md text-gray-800'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <MealIcon className="w-4 h-4 mr-2" />
                    {meal.name}
                    {mealFoods.length > 0 && (
                      <span className="ml-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {mealFoods.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Food List by Meal */}
            <div className="max-h-80 overflow-y-auto space-y-3 custom-scrollbar">
              {consumedFoods.filter(food => food.mealType === selectedMealType).length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {mealTypes.find(m => m.id === selectedMealType)?.icon && 
                      React.createElement(mealTypes.find(m => m.id === selectedMealType)!.icon, { className: "w-8 h-8 text-pink-500" })
                    }
                  </div>
                  <p className="text-lg font-medium">No {selectedMealType} items yet</p>
                  <p className="text-sm">Add some foods to track your {selectedMealType}!</p>
                </div>
              ) : (
                consumedFoods
                  .filter(food => food.mealType === selectedMealType)
                  .map((food, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-lg">{food.name}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Quantity: {food.quantity} × {food.serving}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {(food.calories * food.quantity).toFixed(0)} kcal • 
                            {' '}{(food.protein * food.quantity).toFixed(1)}g protein • 
                            {' '}{(food.carbs * food.quantity).toFixed(1)}g carbs • 
                            {' '}{(food.fats * food.quantity).toFixed(1)}g fats
                          </div>
                        </div>
                        <button
                          onClick={() => removeFood(consumedFoods.indexOf(food))}
                          className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        {/* Macronutrients Analytics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Nutrition Analytics</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {[
              { name: 'Calories', value: totals.calories, unit: 'kcal', color: 'from-rose-400 to-pink-500', target: dailyCaloriesGoal },
              { name: 'Protein', value: totals.protein, unit: 'g', color: 'from-blue-400 to-indigo-500', target: dailyCaloriesGoal * 0.15 / 4 },
              { name: 'Carbs', value: totals.carbs, unit: 'g', color: 'from-green-400 to-emerald-500', target: dailyCaloriesGoal * 0.55 / 4 },
              { name: 'Fats', value: totals.fats, unit: 'g', color: 'from-yellow-400 to-orange-500', target: dailyCaloriesGoal * 0.30 / 9 },
              { name: 'Fiber', value: totals.fiber, unit: 'g', color: 'from-purple-400 to-violet-500', target: 25 },
              { name: 'Sugar', value: totals.sugar, unit: 'g', color: 'from-pink-400 to-rose-500', target: 50 }
            ].map((macro) => {
              const percentage = (macro.value / macro.target) * 100;
              return (
                <div key={macro.name} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <div className={`w-4 h-4 bg-gradient-to-r ${macro.color} rounded-full mb-3`}></div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{macro.value.toFixed(1)}</div>
                  <div className="text-sm font-medium text-gray-600 mb-1">{macro.name}</div>
                  <div className="text-xs text-gray-500 mb-2">{macro.unit}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${macro.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {percentage.toFixed(0)}% of target
                  </div>
                </div>
              );
            })}
          </div>

          {/* Macronutrient Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totals.protein.toFixed(1)}g</div>
              <div className="text-lg font-semibold text-blue-700 mb-1">Protein</div>
              <div className="text-sm text-blue-600">
                {((totals.protein * 4 / totals.calories) * 100 || 0).toFixed(1)}% of total calories
              </div>
              <div className="text-xs text-blue-500 mt-2">
                Target: 15-25% of calories
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">{totals.carbs.toFixed(1)}g</div>
              <div className="text-lg font-semibold text-green-700 mb-1">Carbohydrates</div>
              <div className="text-sm text-green-600">
                {((totals.carbs * 4 / totals.calories) * 100 || 0).toFixed(1)}% of total calories
              </div>
              <div className="text-xs text-green-500 mt-2">
                Target: 45-65% of calories
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{totals.fats.toFixed(1)}g</div>
              <div className="text-lg font-semibold text-yellow-700 mb-1">Fats</div>
              <div className="text-sm text-yellow-600">
                {((totals.fats * 9 / totals.calories) * 100 || 0).toFixed(1)}% of total calories
              </div>
              <div className="text-xs text-yellow-500 mt-2">
                Target: 20-35% of calories
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Food Modal */}
      {showFoodModal && selectedFood && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Add {selectedFood.name}</h3>
              <button
                onClick={() => setShowFoodModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>
            
            {/* Meal Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Add to Meal</label>
              <div className="grid grid-cols-2 gap-3">
                {mealTypes.map((meal) => {
                  const MealIcon = meal.icon;
                  return (
                    <button
                      key={meal.id}
                      onClick={() => setSelectedMealType(meal.id as any)}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        selectedMealType === meal.id
                          ? `bg-gradient-to-r ${meal.color} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <MealIcon className="w-4 h-4 mr-2" />
                      {meal.name}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Nutrition Info */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-6 border border-pink-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calories:</span>
                  <span className="font-semibold">{selectedFood.calories} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein:</span>
                  <span className="font-semibold">{selectedFood.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbs:</span>
                  <span className="font-semibold">{selectedFood.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fats:</span>
                  <span className="font-semibold">{selectedFood.fats}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fiber:</span>
                  <span className="font-semibold">{selectedFood.fiber}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sugar:</span>
                  <span className="font-semibold">{selectedFood.sugar}g</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-3 text-center">
                Per {selectedFood.serving}
              </div>
            </div>
            
            {/* Quantity Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quantity (servings)
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50 text-lg font-semibold text-center"
              />
            </div>
            
            {/* Total Calculation */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 mb-6 border border-gray-200">
              <div className="text-lg font-semibold text-gray-800 mb-3">
                Total for {quantity} serving(s):
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calories:</span>
                  <span className="font-bold text-rose-600">{(selectedFood.calories * quantity).toFixed(1)} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein:</span>
                  <span className="font-bold text-blue-600">{(selectedFood.protein * quantity).toFixed(1)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbs:</span>
                  <span className="font-bold text-green-600">{(selectedFood.carbs * quantity).toFixed(1)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fats:</span>
                  <span className="font-bold text-yellow-600">{(selectedFood.fats * quantity).toFixed(1)}g</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setShowFoodModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addFood}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-colors shadow-lg"
              >
                Add to {mealTypes.find(m => m.id === selectedMealType)?.name}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #f43f5e);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #db2777, #e11d48);
        }
      `}</style>
    </div>
  );
}

export default Calories;