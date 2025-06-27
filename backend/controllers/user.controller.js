import GymOwner from "../Models/GymOwner.js";
import User from "../Models/User.js";
import generateCookie from "../utils/helper/generateCookie.js";
import bcrypt from "bcrypt";

// controllers/user.controller.js
export const register = async (req, res) => {
  try {
    const { role, gender, dob, email, password, username, fullName } = req.body;

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    // 2. Create new user
    let user;
    if (role !== "gym_owner") {
      user = new User({
        email,
        password: await bcrypt.hash(password, 10), // Make sure to hash this before saving
        username,
        name: fullName,
        role,
        gender,
        dob,
      });
    } else {
      user = new GymOwner({
        email,
        password: await bcrypt.hash(password, 10), // Make sure to hash this before saving
        username,
        name: fullName,
        role, gender,
        dob,
      });
    }

    await user.save();

    generateCookie(user._id, res);
    const { password: _, ...userData } = user.toObject();

    res.status(201).json({
      message: "Registration successful",
      user: userData,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ err: "All fields are required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await GymOwner.findOne({ email });
    }
    if (!user) {
      return res.status(401).json({ err: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ err: "Invalid credentials" });
    }
    generateCookie(user._id, res);
    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      return res.status(500).json({ err: "Internal server error" });
    }
  }
};

const logoutController = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in signupUser: ", error);
    res.status(500).json({ error });
  }
};

export { loginController, logoutController };
