import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.routes.js';
import AuthRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import postRoutes from './routes/post.routes.js';
import commentRoute from './routes/comment.route.js';
import path from 'path';


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
    const __dirname=path.resolve();


app.use("/api/user",UserRoutes);
app.use("/api/auth",AuthRoutes);
app.use("/api/post",postRoutes);
app.use("/api/comment",commentRoute);

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
