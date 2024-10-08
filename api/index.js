import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.routes.js';
import AuthRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";


dotenv.config();  

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json())
app.use(cookieParser());

console.log('MONGO_URL:', process.env.MONGO_URL);  


mongoose.connect(process.env.MONGO_URL,{
    connectTimeoutMS: 20000
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });


app.use("/api/user",UserRoutes);
app.use("/api/auth",AuthRoutes);
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
