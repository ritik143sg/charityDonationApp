const express = require("express");

const { varifyToken } = require("../middleware/jwt");
const {
  registerCharityOrg,
  createProject,
  projectInfo,
  charityInfo,
  getAllOrgs,
  authOrgs,
  getAllProject,
  editReport,
} = require("../controllers/charityControllers");

const charityRouter = express.Router();

charityRouter.post("/authentication", authOrgs);
charityRouter.post("/register", registerCharityOrg);

charityRouter.post("/createproject/:id", createProject);
charityRouter.get("/projectinfo/:id", projectInfo);
charityRouter.get("/charityinfo/:id", charityInfo);
charityRouter.get("/getAllOrgs", getAllOrgs);
charityRouter.get("/getAllProjects/:orgId", getAllProject);

charityRouter.patch("/editReport/:id", editReport);

module.exports = charityRouter;
