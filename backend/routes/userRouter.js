const express = require("express");
const {
  authentication,
  register,
  donationHistory,
  updatePassword,
  searchProject,
  fileDownload,
} = require("../controllers/userControllers");
const { varifyToken } = require("../middleware/jwt");

const userRouter = express.Router();

userRouter.post("/authentication", authentication);
userRouter.post("/register", register);
userRouter.get("/donationhistory", varifyToken, donationHistory);
userRouter.get("/download/", varifyToken, fileDownload);
userRouter.patch("/updatePassword", varifyToken, updatePassword);
userRouter.get("/search", varifyToken, searchProject);

module.exports = userRouter;
