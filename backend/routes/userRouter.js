const express = require("express");
const {
  authentication,
  register,
  donationHistory,
  updatePassword,
  searchProject,
} = require("../controllers/userControllers");
const { varifyToken } = require("../middleware/jwt");

const userRouter = express.Router();

userRouter.post("/authentication", authentication);
userRouter.post("/register", register);
userRouter.get("/donationhistory", varifyToken, donationHistory);
// userRouter.post("/donation/:projectId", varifyToken, donation);
userRouter.patch("/updatePassword", varifyToken, updatePassword);
userRouter.get("/search", varifyToken, searchProject);

module.exports = userRouter;
