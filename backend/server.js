import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect from './config/db.js';
import auth from './routes/auth.js'; 
import tripRoutes from './routes/trip.js';



const app = express();
app.use(express.json());
app.use(cors());
connect();



app.use("/api/auth", auth);
app.use('/api/trip', tripRoutes); 


app.listen(3500,()=>{
    console.log("app is running on port 3500");
})
