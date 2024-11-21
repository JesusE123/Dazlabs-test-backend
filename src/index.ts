// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";
import userRoutes from './routes/userRoutes';
import cors from "cors"

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


connectDB()

app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});