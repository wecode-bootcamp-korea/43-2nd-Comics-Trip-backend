const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      const error = new Error("NOT_EXIST_TOKEN");
      throw error;
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    const user = await userService.checkUserId(decoded.userId);

    if (!user) {
      const error = new Error("INVALID_TOKEN");
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    error.statusCode = 401;
    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = {
  checkToken,
};
