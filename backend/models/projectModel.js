const { DataTypes } = require("sequelize");
const sequelize = require("../utils/DB/connectDB");

const Project = sequelize.define("Project", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  targetMoney: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentMoney: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ImpactReport: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "To be Start",
  },
});

module.exports = Project;
