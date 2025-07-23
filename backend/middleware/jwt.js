const jwt = require("jsonwebtoken");

const jwtKey = "ritiksg143";

const getToken = async (user, role) => {
  console.log(user);
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      role: role,
    },

    jwtKey,

    {
      expiresIn: "120h",
    }
  );
  return token;
};

const varifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Authentication header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, jwtKey);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { varifyToken, getToken };
