import mongoose from "mongoose";
import Users from "../models/User.modal.js";

export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const result = await Users.paginate({}, { page, limit });

    res.render("users", {
      totalUsers: result?.totalDocs,
      limit: result?.limit,
      totalPages: result?.totalPages,
      currentPage: result?.page,
      pagingCounter: result?.pagingCounter,
      hasPrevPage: result?.hasPrevPage,
      hasNextPage: result?.hasNextPage,
      prevPage: result?.prevPage,
      nextPage: result?.nextPage,
      docs: result?.docs,
    });
  } catch (err) {
    console.error("error fetching users:", err);

    res.status(500).send("Error fetching users");
  }
};

export const goAddUser = async (req, res) => {
  res.render("addUser");
};

export const addNewUser = async (req, res) => {
  try {
    const user = await Users.create({
      name: req.body.name,
      class: req.body.class,
      rollNo: req.body.rollNo,
    });
    console.log("user created:", user);
    res.redirect("/");
  } catch (err) {
    console.error("error fetching user details:", err);
    res.status(500).send("Eroor fetching user details");
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      return res.status(404).render("404", { message: "User not found" });
    }
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).render("404", { message: "User not found" });
    }
    res.render("userDetails", { user });
  } catch (err) {
    console.error("error fetching user details:", err);
    res.status(500).send("Error fetching user details");
  }
};

export const goUpdateUser = async (req, res) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      return res.status(404).render("404", { message: "User not found" });
    }
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).render("404", { message: "User not found" });
    }
    res.render("updateUser", { user });
  } catch (err) {
    console.error("error fetching user details:", err);
    res.status(500).send("Error fetching user details");
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      return res.status(404).render("404", { message: "User not found" });
    }
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        class: req.body.class,
        rollNo: req.body.rollNo,
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).render("404", { message: "User not found" });
    }
    res.redirect("/userDetails/" + user._id);
  } catch (err) {
    console.error("error fetching user details:", err);
    res.status(500).send("Error fetching user details");
  }
};

export const deleteUserInfo = async (req, res) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      return res.status(404).render("404", { message: "User not found" });
    }
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).render("404", { message: "User not found" });
    }
    res.redirect("/");
  } catch (err) {
    console.error("error fetching user details:", err);
    res.status(500).send("Error fetching user details");
  }
};
