import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import noteRoutes from './routes/noteRoutes';
import { logger } from './middleware/logger';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger); 
app.use('/notes', noteRoutes); 

export default app;
