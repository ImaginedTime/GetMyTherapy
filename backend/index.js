import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to the backend");
});

// routes
app.use("/api/user", userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("connected to db and listening on port", process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
