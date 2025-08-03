import mongoose from "mongoose";

//connect  mongodb
export const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/usersDB")
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB coonection error:", err));
};
