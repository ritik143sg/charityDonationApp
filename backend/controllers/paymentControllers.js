const { Donation, User, Project } = require("../models");
const sendEmail = require("../services/emailService");
const { createOrder, getPaymentStatus } = require("../services/payment");
const sequelize = require("../utils/DB/connectDB");

const getSesssionId = async (req, res) => {
  const user = req.user;
  const projectId = req.params.projectId;
  const money = req.query.money;
  //const transaction = await sequelize.transaction();

  try {
    const orderID = "ORDER_" + Date.now();
    const id = await createOrder(
      orderID,
      money,
      "INR",
      user.id,
      "9988776633",
      user.eamil
    );

    await Donation.create(
      {
        UserId: user.id,
        paymentId: orderID,
        money: money,
        ProjectId: projectId,
        status: "Pending",
      }
      // { transaction }
    );

    const data = {
      id: id,
      user: user,
      projectId: projectId,
    };
    // await transaction.commit();
    res.json({ data: data });
  } catch (error) {
    // await transaction.rollback();
    res.status(500).json({ error: error });
  }
};

const paymentStatus = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const transaction = await sequelize.transaction();

  try {
    const response = await getPaymentStatus(id);

    await Donation.update(
      { status: response },
      {
        where: { paymentId: id },
        transaction,
      }
    );

    const donation = await Donation.findOne({
      where: {
        paymentId: id,
      },
    });

    console.log("DONATION OBJ", donation);

    const projectDonation = await Project.findOne({
      where: { id: donation.ProjectId },
    });

    // // Check if the project exists
    // if (!projectDonation) {
    //   throw new Error("Project not found");
    // }

    // Add donation amount to currentMoney and update the project
    await Project.update(
      {
        currentMoney:
          Number(projectDonation.currentMoney) + Number(donation.money),
      },
      {
        where: { id: projectDonation.id },
      }
    );

    const user = await User.findByPk(donation.UserId);

    sendEmail({ user: user, money: donation.money });

    await transaction.commit();

    res.send(`<body class="bg-light d-flex justify-content-center align-items-center vh-100 ">
        <div class="text-center">
          <h1 class="text-success display-4 fw-bold">Payment Successful!</h1>
          <p class="lead">Thank you for your purchase. Your transaction was completed successfully.
          Your order Id is ${id}
          </p>
          <a href="http://127.0.0.1:5500/frontend/index.html" class="btn btn-primary mt-3">Go Home</a>
        </div>
        
      </body>`);
  } catch (err) {
    await transaction.rollback();
    console.error("Fetch payment error:", err);
  }
};

module.exports = { getSesssionId, paymentStatus };
