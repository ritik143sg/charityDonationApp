const express = require("express");
const {
  authentication,
  register,
  donationHistory,
  updatePassword,
  searchProject,
  fileDownload,
  getUserDetails,
  getAllUser,
  getAllDonation,
  updateProfile,
} = require("../controllers/userControllers");
const { varifyToken } = require("../middleware/jwt");
const checkRole = require("../middleware/checkRole");

const userRouter = express.Router();

userRouter.post("/authentication", authentication);
userRouter.post("/register", register);
userRouter.get(
  "/donationhistory",
  varifyToken,
  checkRole("user"),
  donationHistory
);
userRouter.get("/download/", varifyToken, checkRole("user"), fileDownload);
userRouter.patch(
  "/updatePassword",
  varifyToken,
  checkRole("user"),
  updatePassword
);
userRouter.get("/search", searchProject);
userRouter.get("/userdetails", varifyToken, checkRole("user"), getUserDetails);
userRouter.get("/getAllUsers", getAllUser);
userRouter.get("/getAllDonation", getAllDonation);

userRouter.patch(
  "/updateProfile",
  varifyToken,
  checkRole("user"),
  updateProfile
);

module.exports = userRouter;
