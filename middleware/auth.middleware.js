var jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    next();
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports = authMiddleware;
