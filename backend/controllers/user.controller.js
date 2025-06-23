import User from "../Models/User.js";
import generateCookie from "../utils/helper/generateCookie.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      fullName,
      location,
      fitnessGoals,
      gender,
      dob,
      height,
      weight,
      role,
      periodTrackingOptIn,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      username,
      name: fullName,
      location,
      fitnessGoals,
      gender,
      dob,
      height,
      weight,
      role,
      periodTrackingOptIn,
    });

    await user.save();

    generateCookie(user._id, res);
    const { password: _, ...userData } = user.toObject();

    res.status(201).json({
      message: "Registration successful",
      user: userData,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ err: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ err: "Invalid credentials" });
    }
    console.log(user.password, password);

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
