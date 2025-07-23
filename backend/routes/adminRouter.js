const express = require("express");
const {
  registerAdmin,
  changeOrgStatus,
  deleteUser,
  deleteOrg,
  deleteProject,
  authenticationAdmin,
  getAllAdmin,
} = require("../controllers/adminControllers");
const { varifyToken } = require("../middleware/jwt");
const checkRole = require("../middleware/checkRole");

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/auth", authenticationAdmin);
adminRouter.post(
  "/orgstatus/:decision",
  varifyToken,
  checkRole("admin"),
  changeOrgStatus
);
adminRouter.delete("/user/:id", varifyToken, checkRole("admin"), deleteUser);
adminRouter.delete("/org", varifyToken, checkRole("admin"), deleteOrg);
adminRouter.delete("/project", varifyToken, checkRole("admin"), deleteProject);
adminRouter.get("/getAllAdmin", varifyToken, checkRole("admin"), getAllAdmin);

module.exports = adminRouter;
