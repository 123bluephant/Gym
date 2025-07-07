import GymOwner from "../Models/GymOwner.js";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            console.log('No token provided');
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }
        const decoded = jwt.verify(token, "thisismysecrect");
        let user = await User.findById(decoded.userId).select("-password");
        if(!user){
            user = await GymOwner.findById(decoded.userId).select("-password");
        }
        if (!user) {
            return res.status(404).json({ error: "Unauthorized: User not found" });
        }
        console.log("User found:", user);
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute:", error);
        res.status(401).json({ error: "Unauthorized: Token is invalid or expired" });
    }
};

export { protectRoute };
