import express from "express";
import cors from "cors";
import 'dotenv/config';
import { connectdb } from "./db/db.js";
import cookieParser from "cookie-parser";
import UserRoute from "./route/user.route.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

// ✅ Correct production static config
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../Frontend/dist');
  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
