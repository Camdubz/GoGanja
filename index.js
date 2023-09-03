import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/auth.js";
import roomsRoute from "./routes/auth.js";
import usersRoute from "./routes/auth.js";
const app = express();
dotenv.config();

const connect = async () => {
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!")
  } catch (error) {
    throw error
  }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
});

mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected!")
});

//midelwares
app.use("api/auth", authRoute);
app.use("api/users", authRoute);
app.use("api/hotels", authRoute);
app.use("api/rooms", authRoute);

app.listen(8800, () => {
    connect()
    console.log("Connected to backend!");
});

