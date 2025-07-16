const { DataTypes } = require("sequelize");
const sequelize = require("../utils/DB/connectDB");

const CharityOrg = sequelize.define("CharityOrg", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orgName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orgPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orgMail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mission: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  goals: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
  office: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CharityOrg;
