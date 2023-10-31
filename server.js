import express from 'express';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

connectDB();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);



app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server is up and running on port 5000");
})

