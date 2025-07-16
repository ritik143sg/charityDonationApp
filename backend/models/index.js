const CharityOrg = require("./charityOrgModel");
const Donation = require("./donationModel");
const Project = require("./projectModel");
const User = require("./userModel");

CharityOrg.hasMany(Project, { foreignKey: "CharityId" });
Project.belongsTo(CharityOrg, { foreignKey: "CharityId" });

Project.hasMany(Donation, { foreignKey: "ProjectId" });
Donation.belongsTo(Project, { foreignKey: "ProjectId" });

User.hasMany(Donation, { foreignKey: "UserId" });
Donation.belongsTo(User, { foreignKey: "UserId" });

module.exports = {
  CharityOrg,
  User,
  Project,
  Donation,
};
