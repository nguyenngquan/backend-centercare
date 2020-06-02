var jwt = require("jsonwebtoken");

const roleMiddleware = (role) => (req, res, next) => {
  const payload = jwt.decode(req.headers.authorization);
  if (payload.role === role) {
    next();
  } else {
    res.json({
      message: "Bạn không có quyền thực hiện hành động này.",
    });
  }
};

module.exports = roleMiddleware;
