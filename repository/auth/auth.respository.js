var response = require("../../shared/response");
var TYPES = require("tedious").TYPES;
var sha256 = require("sha256");
var jwt = require("jsonwebtoken");

function authRepository(dbContext) {
  function dangNhapHocVien(req, res) {
    var parameters = [];

    parameters.push({
      name: "taikhoanHV",
      type: TYPES.VarChar,
      val: req.body.username,
    });

    parameters.push({
      name: "matkhauHV",
      type: TYPES.VarChar,
      val: sha256(req.body.password),
    });

    var query =
      "select * from HocVien where taikhoanHV = @taikhoanHV and matkhauHV = @matkhauHV";

    dbContext.getQuery(query, parameters, false, function (error, data) {
      let responseData = null;
      if (data) {
        const token = jwt.sign(
          { role: "HV", username: req.body.username },
          process.env.SECRET_KEY
        );
        responseData = {
          status: "success",
          token,
        };
      } else {
        responseData = {
          status: "fail",
          message: "Tên tài khoản hoặc mật khẩu không chính xác.",
        };
      }
      return res.json(response(responseData, error));
    });
  }

  function dangNhapNhanVien(req, res) {
    var parameters = [];

    parameters.push({
      name: "taikhoanNV",
      type: TYPES.VarChar,
      val: req.body.username,
    });

    parameters.push({
      name: "matkhauNV",
      type: TYPES.VarChar,
      val: sha256(req.body.password),
    });

    var query =
      "select * from NhanVien where taikhoanNV = @taikhoanNV and matkhauNV = @matkhauNV";

    dbContext.getQuery(query, parameters, false, function (error, data) {
      let responseData = null;
      if (data) {
        const token = jwt.sign(
          { role: "NV", username: req.body.username },
          process.env.SECRET_KEY
        );
        responseData = {
          status: "success",
          token,
        };
      } else {
        responseData = {
          status: "fail",
          message: "Tên tài khoản hoặc mật khẩu không chính xác.",
        };
      }
      return res.json(response(responseData, error));
    });
  }

  return {
    dangNhapHocVien: dangNhapHocVien,
    dangNhapNhanVien: dangNhapNhanVien,
  };
}

module.exports = authRepository;
