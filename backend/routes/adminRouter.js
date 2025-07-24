const express = require("express");
const {
  registerAdmin,
  changeOrgStatus,
  deleteUser,
  deleteOrg,
  deleteProject,
  authenticationAdmin,
  getAllAdmin,
  deleteAdmin,
  adminDetails,
  updatePassword,
  updateProfile,
} = require("../controllers/adminControllers");
const { varifyToken } = require("../middleware/jwt");
const checkRole = require("../middleware/checkRole");

const adminRouter = express.Router();
adminRouter.get("/adminDetails", varifyToken, checkRole("admin"), adminDetails);
adminRouter.post("/register", registerAdmin);
adminRouter.post("/auth", authenticationAdmin);
adminRouter.post(
  "/orgstatus/:decision",
  varifyToken,
  checkRole("admin"),
  changeOrgStatus
);
adminRouter.delete("/admin/:id", varifyToken, checkRole("admin"), deleteAdmin);
adminRouter.delete("/user/:id", varifyToken, checkRole("admin"), deleteUser);
adminRouter.delete("/org", varifyToken, checkRole("admin"), deleteOrg);
adminRouter.delete(
  "/project/:id",
  varifyToken,
  checkRole("admin"),
  deleteProject
);
adminRouter.get("/getAllAdmin", varifyToken, checkRole("admin"), getAllAdmin);

adminRouter.patch(
  "/updatePassword",
  varifyToken,
  checkRole("admin"),
  updatePassword
);

adminRouter.patch(
  "/updateProfile",
  varifyToken,
  checkRole("admin"),
  updateProfile
);

module.exports = adminRouter;
