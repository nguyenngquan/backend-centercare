const express = require("express");

function eRoutes() {
  const router = express.Router();
  var hocvien = require("./repository/hocvien/hocvien.routes")(router);
  var lop = require("./repository/lop/lop.routes")(router);
  var nhanvien = require("./repository/nhanvien/nhanvien.routes")(router);
  var nhucauhoc = require("./repository/nhucauhoc/nhucauhoc.routes")(router);
  var dknhucauhoc = require("./repository/dknhucauhoc/dknhucauhoc.routes")(
    router
  );
  var lichhoc = require("./repository/lichhoc/lichhoc.routes")(router);
  var diemdanh = require("./repository/diemdanh/diemdanh.routes")(router);
  var baitap = require("./repository/baitap/baitap.routes")(router);
  var kiemtra = require("./repository/kiemtra/kiemtra.routes")(router);
  var nhomlop = require("./repository/nhomlop/nhomlop.routes")(router);
  var ketquahoctap = require("./repository/ketquahoctap/ketquahoctap.routes")(
    router
  );
  return router;
}

module.exports = eRoutes;
