
import express from "express"
import cors from "cors";
import 'dotenv/config'
import { connectdb } from "./db/db.js";
import cookieParser from "cookie-parser"
import UserRoute from "./route/user.route.js"
import GymRoute from "./route/gym.router.js"
import FoodData from "./route/foodRoute.route.js"
import path from 'path';
import bodyParser from "body-parser";
import { protectRoute } from "./Middleware/protectRoute.js";

const __dirname = path.resolve();
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, 
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectdb();

app.use('/api/user', UserRoute);
app.use('/api/gym', protectRoute,GymRoute);
app.use('/api/food', FoodData);

const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
