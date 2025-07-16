const { Op } = require("sequelize");
const { encryptPassword, comparePassword } = require("../middleware/bcrypt");
const { getToken } = require("../middleware/jwt");
const { Donation, Project } = require("../models");
const User = require("../models/userModel");
const sendEmail = require("../services/emailService");
const AWS = require("aws-sdk");

function uploadToS3(data, fileName) {
  const BUCKET_NAME = "expensetracker143";
  const IAM_USER_KEY = "AKIAUV2FUZVPZR2BV7MN";
  const IAM_USER_SECRET = "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";

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        console.log("Error uploading to S3", err);
        reject(err);
      } else {
        console.log("Upload Success", s3response);
        resolve(s3response.Location);
      }
    });
  });
}

const authentication = async (req, res) => {
  const user = req.body;

  if (!user.email || !user.password) {
    res.status(404).json({
      msg: "Fill All Field",
    });
  }

  try {
    const DBuser = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (!DBuser) {
      res.status(404).json({
        msg: "User Not Found",
      });
    }

    if (!(await comparePassword(user.password, DBuser.password))) {
      res.status(500).json({
        msg: "Password Not Same",
      });
    }

    res.status(200).json({
      msg: "User LogIn",
      token: await getToken(DBuser),
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const register = async (req, res) => {
  const user = req.body;

  if (!user.email || !user.password || !user.username) {
    res.status(404).json({
      msg: "Fill All Field",
    });
  }

  const encryptedPassword = await encryptPassword(user.password);

  console.log(user);

  try {
    const DBuser = await User.findOne({
      where: {
        email: user.email,
      },
    });

    if (DBuser) {
      res.status(200).json({
        msg: "User Exist already",
      });
    }

    const response = await User.create({
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: encryptedPassword,
    });

    console.log(response);

    res.status(200).json({
      msg: "User register",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const donationHistory = async (req, res) => {
  const user = req.user;

  try {
    const donations = await Donation.findAll({
      where: {
        UserId: user.id,
      },
    });

    res.status(200).json({ msg: "User's donations", donations });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

const donation = async (req, res) => {
  const user = req.user;
  const projectId = req.params.projectId;

  const money = req.body;

  try {
    const donation = await Donation.create({
      money: money.money,
      ProjectId: projectId,
    });

    const DBuser = await User.findByPk(user.id);

    await DBuser.addDonation(donation);

    sendEmail({ user: user, money: money });

    res.status(200).json({ msg: "Donation Done" });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const user = req.user;
  const updatePassword = req.body;

  try {
    const DBuser = await User.findByPk(user.id);

    if (!(await comparePassword(updatePassword.oldPassword, DBuser.password))) {
      return res.status(400).json({ msg: "Password Mismatch" });
    }

    const hashedPassword = await encryptPassword(updatePassword.newPassword);

    await User.update({ password: hashedPassword }, { where: { id: user.id } });

    res.status(200).json({ msg: "Password Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const updateProfilePic = async (req, res) => {};

const searchProject = async (req, res) => {
  const input = req.query.input;

  console.log(input);

  try {
    const project = await Project.findOne({
      where: {
        projectName: {
          [Op.like]: `%${input}%`,
        },
      },
    });

    res
      .status(200)
      .json({ msg: "Got Project ", project: project, input: input });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const fileDownload = async (req, res) => {
  const projectId = req.params.id;
  const user = req.user;

  try {
    const donation = await Donation.findAll({
      where: { UserId: user.id },
      order: [["createdAt", "DESC"]],
    });

    const stringDonation = JSON.stringify(donation);
    const fileName = `Donation_${user.id}_${Date.now()}.txt`; // unique filename
    const fileUrl = await uploadToS3(stringDonation, fileName); // await here

    res.status(201).json({
      msg: "File retrieved",
      donation: donation,
      fileUrl: fileUrl,
    });
  } catch (error) {
    console.error("getExpenseFile error:", error);
    res
      .status(500)
      .json({ msg: "Expense fetching failed", error: error.message });
  }
};

module.exports = {
  authentication,
  register,
  donation,
  donationHistory,
  updatePassword,
  updateProfilePic,
  searchProject,
  fileDownload,
};
