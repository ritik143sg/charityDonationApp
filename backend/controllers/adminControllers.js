const { encryptPassword, comparePassword } = require("../middleware/bcrypt");
const { getToken } = require("../middleware/jwt");
const { CharityOrg, Project, User } = require("../models");
const Admin = require("../models/adminModel");

const authenticationAdmin = async (req, res) => {
  const user = req.body;

  if (!user.email || !user.password) {
    res.status(404).json({
      msg: "Fill All Field",
    });
  }

  try {
    const DBuser = await Admin.findOne({
      where: {
        email: user.email,
      },
    });

    if (!DBuser) {
      res.status(404).json({
        msg: "Admin Not Found",
      });
    }

    if (!(await comparePassword(user.password, DBuser.password))) {
      res.status(500).json({
        msg: "Password Not Same",
      });
    }

    res.status(200).json({
      msg: "Admin LogIn",
      token: await getToken(DBuser, "admin"),
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const registerAdmin = async (req, res) => {
  const admin = req.body;

  if (
    !admin.email ||
    !admin.password ||
    !admin.username ||
    !admin.phoneNumber
  ) {
    res.status(404).json({
      msg: "Fill All Field",
    });
  }

  const encryptedPassword = await encryptPassword(admin.password);

  console.log(admin);

  try {
    const DBadmin = await Admin.findOne({
      where: {
        email: admin.email,
      },
    });

    if (DBadmin) {
      res.status(500).json({
        msg: "Admin Exist already",
      });
    }

    const response = await Admin.create({
      username: admin.username,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      password: encryptedPassword,
      image: "",
    });

    console.log(response);

    res.status(200).json({
      msg: "Admin register",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const changeOrgStatus = async (req, res) => {
  const org = req.body;

  const decision = Number(req.params.decision);

  try {
    const charityOrg = await CharityOrg.findByPk(org.id);

    if (charityOrg.status != "Pending") {
      res.status(500).json({
        msg: "Status Already Changed",
      });
    }

    if (decision) {
      await CharityOrg.update(
        { status: "Accepted" },
        {
          where: {
            id: org.id,
          },
        }
      );
    } else {
      await CharityOrg.update(
        { status: "Rejected" },
        {
          where: {
            id: org.id,
          },
        }
      );
    }

    res.status(200).json({
      msg: "Org Status Changed",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const projectStatus = async (req, res) => {
  const projectId = req.params.id;

  try {
    if (dicision) {
      const project = await Project.update(
        {
          status: "Stopped",
        },
        {
          where: {
            id: projectId,
          },
        }
      );
    } else {
      const project = await Project.update(
        {
          status: "Started",
        },
        {
          where: {
            id: projectId,
          },
        }
      );
    }
    res.status(200).json({
      msg: "Project Status Changed",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const deleteOrg = async (req, res) => {
  const orgId = req.params.id;

  try {
    await CharityOrg.destroy({
      where: {
        id: orgId,
      },
    });
    res.status(200).json({
      msg: "CharityOrg deleted ",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    await Project.destroy({
      where: {
        id: projectId,
      },
    });
    res.status(200).json({
      msg: "Project deleted ",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await User.destroy({
      where: {
        id: userId,
      },
    });
    res.status(200).json({
      msg: "user deleted ",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.findAll();

    res.status(200).json({
      msg: "get all admin",
      admins: admin,
    });
  } catch (error) {
    res.status(500).json({
      msg: "error all admin",
      error: error.message,
    });
  }
};

const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    await Admin.destroy({
      where: {
        id: adminId,
      },
    });
    res.status(200).json({
      msg: "admin deleted ",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const adminDetails = async (req, res) => {
  const admin = req.user;

  console.log("pppppppppp", req);

  try {
    const adminUser = await Admin.findByPk(admin.id);
    res.status(200).json({
      msg: "get admin  ",
      admin: adminUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

const updatePassword = async (req, res) => {
  const admin = req.user;
  const updatePassword = req.body;

  try {
    const DBuser = await Admin.findByPk(admin.id);

    if (!(await comparePassword(updatePassword.oldPassword, DBuser.password))) {
      return res.status(400).json({ msg: "Password Mismatch" });
    }

    const hashedPassword = await encryptPassword(updatePassword.newPassword);

    await Admin.update(
      { password: hashedPassword },
      { where: { id: admin.id } }
    );

    res.status(200).json({ msg: "Password Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const admin = req.user;
  const profile = req.body;

  try {
    //const DBuser = await User.findByPk(user.id);

    await Admin.update(
      { username: profile.username, phoneNumber: profile.phoneNumber },
      { where: { id: admin.id } }
    );

    res.status(200).json({ msg: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

module.exports = {
  authenticationAdmin,
  registerAdmin,
  changeOrgStatus,
  projectStatus,
  deleteOrg,
  deleteProject,
  deleteUser,
  getAllAdmin,
  deleteAdmin,
  adminDetails,
  updatePassword,
  updateProfile,
};
