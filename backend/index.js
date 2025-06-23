
import express from "express"
import cors from "cors";
import 'dotenv/config'
import { connectdb } from "./db/db.js";
import cookieParser from "cookie-parser"
import UserRoute from "./route/user.route.js"
import path from 'path';

const __dirname = path.resolve();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

connectdb();

app.use('/api/user', UserRoute);

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/Frontend/dist')));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, 'Frontend', 'dist', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
