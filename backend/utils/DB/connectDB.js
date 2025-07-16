const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("charityDonationApp", "root", "22523233", {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connected");
  } catch (error) {
    console.log(`DB Error : ${error}`);
  }
})();

module.exports = sequelize;
