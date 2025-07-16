const express = require("express");
const sequelize = require("./utils/DB/connectDB");
const userRouter = require("./routes/userRouter");
const cors = require("cors");
const adminRouter = require("./routes/adminRouter");
const dotenv = require("dotenv");
const charityRouter = require("./routes/charityRouter");
const paymentRouter = require("./routes/paymentRouter");
require("./models/adminModel");
dotenv.config();
require("./models/userModel");
require("./models");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/charity", charityRouter);
app.use("/payment", paymentRouter);

app.get("/app", (req, res) => {
  res.send("<h1>Hii</h1>");
});

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on the port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
