const { Donation, User } = require("../models");
const sendEmail = require("../services/emailService");
const { createOrder, getPaymentStatus } = require("../services/payment");
const sequelize = require("../utils/DB/connectDB");

const getSesssionId = async (req, res) => {
  const user = req.user;
  const projectId = req.params.projectId;
  const money = req.query.money;

  try {
    const orderID = "ORDER_" + Date.now();
    const id = await createOrder(
      orderID,
      101,
      "INR",
      user.id,
      "9988776633",
      user.eamil
    );

    await Donation.create({
      UserId: user.id,
      paymentId: orderID,
      money: money,
      ProjectId: projectId,
      status: "Pending",
    });

    const data = {
      id: id,
      user: user,
      projectId: projectId,
    };

    res.json({ data: data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const paymentStatus = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  try {
    const response = await getPaymentStatus(id);

    await Donation.update({ status: response }, { where: { paymentId: id } });

    const donation = await Donation.findOne({
      where: {
        paymentId: id,
      },
    });

    const user = await User.findByPk(donation.UserId);

    sendEmail({ user: user, money: donation.money });

    res.send(`<body class="bg-light d-flex justify-content-center align-items-center vh-100 ">
        <div class="text-center">
          <h1 class="text-success display-4 fw-bold">Payment Successful!</h1>
          <p class="lead">Thank you for your purchase. Your transaction was completed successfully.
          Your order Id is ${id}
          </p>
          <a href="/payment.html" class="btn btn-primary mt-3">Go Home</a>
        </div>
        
      </body>`);
  } catch (err) {
    console.error("Fetch payment error:", err);
  }
};

module.exports = { getSesssionId, paymentStatus };
