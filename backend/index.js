import express from "express"
import cors from "cors";
import 'dotenv/config'
import { connectdb } from "./db/db.js";
import cookieParser from "cookie-parser"
import UserRoute from "./route/user.route.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors({
  origin: ["https://localhost:3000"],
  credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
connectdb();

app.use('/api/user', UserRoute);


const port = process.env.PORT
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/Frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'Frontend', 'dist', 'index.html'));
    })
}
app.listen(port,()=>{
    console.log(`running on port ${port}`)
})