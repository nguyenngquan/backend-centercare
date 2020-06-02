const express = require("express");

function eRoutes() {
  const router = express.Router();
  require("./repository/auth/auth.routes")(router);
  return router;
}

module.exports = eRoutes;
