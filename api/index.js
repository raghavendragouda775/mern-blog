import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.routes.js';
dotenv.config();  


const app = express();

console.log('MONGO_URL:', process.env.MONGO_URL);  


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });


app.use("/api/user",UserRoutes);
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
