const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  } catch (error) {
    return error;
  }
};
const comparePassword = async (password, DBpassword) => {
  try {
    const compare = await bcrypt.compare(password, DBpassword);
    return compare;
  } catch (error) {
    return error;
  }
};

module.exports = { encryptPassword, comparePassword };
