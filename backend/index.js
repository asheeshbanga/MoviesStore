import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import moviesRoute from './routes/movieRoutes.js';
import cors from 'cors';

const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling cors policy
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     headers: ['Content-Type']
// }))

// home route
app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to MERN Stack Movie Portal');
});

// middleware to connect to movie routes
app.use('/movies', moviesRoute);

// connect to DB
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to DB');
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })
