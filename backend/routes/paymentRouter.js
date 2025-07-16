const express = require("express");
const {
  getSesssionId,
  paymentStatus,
} = require("../controllers/paymentControllers");
const { varifyToken } = require("../middleware/jwt");

const paymentRouter = express.Router();

paymentRouter.get("/sessionId/:projectId", varifyToken, getSesssionId);
paymentRouter.get("/status/:id", paymentStatus);

module.exports = paymentRouter;
