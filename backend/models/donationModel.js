const { DataTypes } = require("sequelize");
const sequelize = require("../utils/DB/connectDB");

const Donation = sequelize.define("Donation", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  money: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Donation;
