const express = require("express");
const {
  registerAdmin,
  changeOrgStatus,
  deleteUser,
  deleteOrg,
  deleteProject,
  authenticationAdmin,
} = require("../controllers/adminControllers");

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/auth", authenticationAdmin);
adminRouter.post("/orgstatus/:decision", changeOrgStatus);
adminRouter.delete("/user", deleteUser);
adminRouter.delete("/org", deleteOrg);
adminRouter.delete("/project", deleteProject);

module.exports = adminRouter;
