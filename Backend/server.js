import express from 'express';
import "dotenv/config";
import mongoose from 'mongoose';
import cors from 'cors';
import chatRoutes from './routes/chat.js';



const app= express();

app.use(cors());
app.use(express.json());
app.use('/api', chatRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    }catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }};


app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});


app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
    connectDB();
});


