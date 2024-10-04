import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
