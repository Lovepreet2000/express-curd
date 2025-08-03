import express from "express";
const router = express.Router();
import Users from "../models/User.modal.js";
import {
  addNewUser,
  deleteUserInfo,
  getUserDetails,
  getUsers,
  goAddUser,
  goUpdateUser,
  updateUserInfo,
} from "../controllers/users.controller.js";

router.get("/", getUsers);

router.get("/addUser", goAddUser);

router.post("/addUser", addNewUser);

router.get("/userDetails/:id", getUserDetails);

router.get("/updateUser/:id/edit", goUpdateUser);

router.post("/updateUser/:id", updateUserInfo);

router.post("/deleteUser/:id", deleteUserInfo);

export default router;
