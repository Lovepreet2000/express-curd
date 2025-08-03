// const express = require("express");
import express from "express";

const app = express();

import UserRouter from "./routes/users.routes.js";
import { connectDB } from "./config/database.js";

//connect to database
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extends: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Routes
app.use("/", UserRouter);

//app.userRouter('/user/ ', 'userRouter');   its endpoint changed for userRouter

//
app.listen(3000, () => {
  console.log("service is running on port 3000");
});
