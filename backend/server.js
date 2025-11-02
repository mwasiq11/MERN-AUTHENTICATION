import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {connectDB} from './config/db.js';
import authRouter from "./routes/auth.js"

const PORT=process.env.PORT || 3000;
const app=express();
app.use(express.json());
// generate the routes for authentication 
app.use('/api/users',authRouter);
connectDB();
app.listen(PORT,()=>{
	console.log(`server is running on http://localhost:${PORT}`);
})