const { encryptPassword, comparePassword } = require("../middleware/bcrypt");
const { getToken } = require("../middleware/jwt");
const { CharityOrg, Project } = require("../models");
const sequelize = require("../utils/DB/connectDB");

const authOrgs = async (req, res) => {
  const org = req.body;

  try {
    const DBorg = await CharityOrg.findOne({
      where: {
        email: org.email,
      },
    });

    if (!DBorg) {
      res.status(404).json({ msg: "User Not Found" });
    }

    if (!(await comparePassword(org.orgPassword, DBorg.orgPassword))) {
      res.status(500).json({ msg: "Password Miss Match" });
    }

    res.status(200).json({
      msg: "Org Login",
      orgId: DBorg.id,
      token: await getToken(DBorg, "orgs"),
    });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

const registerCharityOrg = async (req, res) => {
  const charity = req.body;

  try {
    console.log("Registering org:", charity.email);

    const hashPass = await encryptPassword(charity.orgPassword);

    const org = await CharityOrg.findOne({
      where: { email: charity.email },
    });

    if (org) {
      return res
        .status(409)
        .json({ msg: "Org already exists with this email." });
    }

    const response = await CharityOrg.create({
      username: charity.username,
      email: charity.email,
      orgPassword: hashPass,
      mission: charity.mission,
      goals: charity.goals,
      office: charity.office,
    });

    res.status(200).json({ msg: "Org Added", charity: response });
  } catch (error) {
    console.error("Error registering org:", error.message);
    res.status(500).json({ msg: "Error", Error: error.message });
  }
};

const createProject = async (req, res) => {
  const project = req.body;
  const id = req.params.id;
  const transaction = await sequelize.transaction();
  try {
    const response = await Project.create(
      {
        projectName: project.projectName,
        location: project.location,
        targetMoney: project.targetMoney,
        currentMoney: project.currentMoney,
        desc: project.desc,
        ImpactReport: project.ImpactReport,
        category: project.category,
        CharityId: id,
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({ msg: "Org Added", project: response });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ msg: "Error", Error: error.message });
  }
};

const projectInfo = async (req, res) => {
  const id = req.params.id;

  try {
    const projectDetails = await Project.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({ msg: "Project Details ", project: projectDetails });
  } catch (error) {
    res.status(200).json({ msg: "Error", Error: error.message });
  }
};

const charityInfo = async (req, res) => {
  const id = req.params.id;

  try {
    const charityDetails = await CharityOrg.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({ msg: "charity Details ", charity: charityDetails });
  } catch (error) {
    res.status(200).json({ msg: "Error", Error: error.message });
  }
};

const updateProject = async (req, res) => {
  const project = req.body;
  const transaction = await sequelize.transaction();
  try {
    await Project.update(
      {
        status: project.status,
      },
      transaction
    );
    await transaction.commit();
    res.status(200).json({ msg: "Project Updated " });
  } catch (error) {
    await transaction.rollback();
    res.status(200).json({ msg: "Error", Error: error.message });
  }
};

const getAllOrgs = async (req, res) => {
  try {
    const orgs = await CharityOrg.findAll();
    console.log(orgs);

    res.status(200).json({ msg: "Gets All Orgs", Orgs: orgs });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

const getAllProject = async (req, res) => {
  const orgId = req.params.orgId;

  try {
    const projects = await Project.findAll({
      where: {
        CharityId: orgId,
      },
    });
    res.status(200).json({ msg: "Gets All Projects", Project: projects });
  } catch (error) {
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

const updateCharity = () => {};

const deleteProject = async (req, res) => {
  const projectId = req.params.id;
  const transaction = await sequelize.transaction();
  try {
    await Project.destroy({
      where: {
        id: projectId,
      },
      transaction,
    });
    transaction.commit();
    res.status(200).json({ msg: "Project Deleted" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

const editReport = async (req, res) => {
  const projectId = req.params.id;
  const data = req.body;

  const transaction = await sequelize.transaction();
  try {
    await Project.update(
      {
        ImpactReport: data.ImpactReport,
        location: data.location,
        targetMoney: data.targetMoney,
        desc: data.desc,
      },
      {
        where: {
          id: projectId,
        },
        transaction,
      }
    );
    transaction.commit();
    res.status(200).json({ msg: "Project updated" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

const editOrg = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const transaction = await sequelize.transaction();
  try {
    await CharityOrg.update(
      {
        mission: data.mission,
        goals: data.goals,
        office: data.office,
        // desc: data.desc,
      },
      {
        where: {
          id: id,
        },
        transaction,
      }
    );
    transaction.commit();
    res.status(200).json({ msg: "Org updated" });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ msg: "Error", error: error.message });
  }
};

module.exports = {
  registerCharityOrg,
  createProject,
  projectInfo,
  charityInfo,
  updateProject,
  updateCharity,
  getAllOrgs,
  authOrgs,
  getAllProject,
  deleteProject,
  editReport,
  editOrg,
};
