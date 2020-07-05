var response = require("../../shared/response");
var TYPES = require("tedious").TYPES;
var jwt = require("jsonwebtoken");
var sha256 = require("sha256");

function HocvienRepository(dbContext) {
  function findHocvien(req, res, next) {
    if (req.params.idHocVien) {
      var parameters = [];

      parameters.push({
        name: "idHocVien",
        type: TYPES.VarChar,
        val: req.params.idHocVien,
      });

      var query = "select * from HocVien where idHocVien = @idHocVien";

      dbContext.getQuery(query, parameters, false, function (error, data) {
        if (data) {
          req.data = data[0];
          return next();
        }
        return res.sendStatus(404);
      });
    }
  }

  function getHocviens(req, res) {
    dbContext.get("GetHocvien", function (error, data) {
      if (!error) {
        data.success = true;
      }
      return res.json(response(data, error));
    });
  }

  function getHocvien(req, res) {
    return res.json(req.data);
  }

  function getMyInfo(req, res) {
    const payload = jwt.decode(req.headers.authorization);
    var parameters = [];

    parameters.push({
      name: "idHocVien",
      type: TYPES.Int,
      val: payload.idHocVien,
    });

    var query =
      "select idHocVien, taikhoanHV, ten, gioitinh, ngaysinh, diachi, email, dienthoai, HocVien.idLop, tenlop from HocVien inner join Lop on Lop.idLop = HocVien.idLop where idHocVien = @idHocVien";

    dbContext.getQuery(query, parameters, false, function (error, data) {
      if (data) {
        return res.json(response({ data: data[0] }, error));
      }
      return res.sendStatus(404);
    });
  }

  function getByTKHV(req, res) {
    var parameters = [];

    parameters.push({
      name: "taikhoanHV",
      type: TYPES.VarChar,
      val: req.params.taikhoanHV,
    });

    var query = "select * from HocVien where taikhoanHV = @taikhoanHV";

    dbContext.getQuery(query, parameters, false, function (error, data) {
      if (!error) {
        if (data) {
          data = {
            success: true,
            daTonTai: true,
          };
        } else {
          data = {
            success: true,
            daTonTai: false,
          };
        }
      }
      return res.json(response(data, error));
    });
  }

  function themVaoLop(req, res) {
    var parameters = [];

    parameters.push({
      name: "idLop",
      type: TYPES.Int,
      val: req.body.idLop,
    });

    parameters.push({
      name: "idHocViens",
      type: TYPES.VarChar,
      val: req.body.idHocViens,
    });

    parameters.push({
      name: "idDKs",
      type: TYPES.VarChar,
      val: req.body.idDKs,
    });

    dbContext.post("InsertListStudents", parameters, function (error, data) {
      if (!error) {
        data = {
          success: true,
        };
      }
      return res.json(response(data, error));
    });
  }

  function insertHocviens(req, res) {
    var parameters = [];

    parameters.push({
      name: "taikhoanHV",
      type: TYPES.VarChar,
      val: req.body.taikhoanHV,
    });
    parameters.push({
      name: "matkhauHV",
      type: TYPES.VarChar,
      val: sha256(req.body.matkhauHV),
    });
    parameters.push({ name: "ten", type: TYPES.NVarChar, val: req.body.ten });
    parameters.push({
      name: "gioitinh",
      type: TYPES.NChar,
      val: req.body.gioitinh,
    });
    parameters.push({
      name: "ngaysinh",
      type: TYPES.DateTime,
      val: new Date(req.body.ngaysinh),
    });
    parameters.push({
      name: "diachi",
      type: TYPES.NVarChar,
      val: req.body.diachi,
    });
    parameters.push({
      name: "email",
      type: TYPES.VarChar,
      val: req.body.email,
    });
    parameters.push({
      name: "dienthoai",
      type: TYPES.Int,
      val: req.body.dienthoai,
    });
    parameters.push({ name: "idLop", type: TYPES.Int, val: req.body.idLop });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("InsertHocvien", parameters, function (error, data) {
      if (!error) {
        data = {
          success: true,
        };
      }
      return res.json(response(data, error));
    });
  }

  function updateHocviens(req, res) {
    var parameters = [];

    parameters.push({
      name: "idHocVien",
      type: TYPES.Int,
      val: req.body.idHocVien,
    });
    parameters.push({ name: "ten", type: TYPES.NVarChar, val: req.body.ten });
    parameters.push({
      name: "gioitinh",
      type: TYPES.NChar,
      val: req.body.gioitinh,
    });
    parameters.push({
      name: "ngaysinh",
      type: TYPES.DateTime,
      val: new Date(req.body.ngaysinh),
    });
    parameters.push({
      name: "diachi",
      type: TYPES.NVarChar,
      val: req.body.diachi,
    });
    parameters.push({
      name: "email",
      type: TYPES.VarChar,
      val: req.body.email,
    });
    parameters.push({
      name: "dienthoai",
      type: TYPES.VarChar,
      val: req.body.dienthoai,
    });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("UpdateHocvien", parameters, function (error, data) {
      if (!error) {
        data = {
          success: true,
          message: "Lưu thông tin cá nhân thành công.",
        };
      }
      return res.json(response(data, error));
    });
  }

  function putEmployee(req, res) {
    var parameters = [];

    Object.entries(req.data).forEach((property) => {
      if (req.body[property[0]]) {
        parameters.push({
          name: property[0],
          val: req.body[property[0]],
          type: TYPES.VarChar,
        });
      } else {
        parameters.push({
          name: property[0],
          val: property[1],
          type: TYPES.VarChar,
        });
      }
    });

    // parameters.push({ name: 'FirstName', type: TYPES.VarChar, val: req.body.FirstName });
    // parameters.push({ name: 'LastName', type: TYPES.VarChar, val: req.body.LastName });
    // parameters.push({ name: 'MiddleName', type: TYPES.VarChar, val: req.body.MiddleName });
    // parameters.push({ name: 'DOB', type: TYPES.DateTime, val: new Date(req.body.DOB) });
    // parameters.push({ name: 'Designation', type: TYPES.VarChar, val: req.body.Designation });
    // parameters.push({ name: 'ReportingTo', type: TYPES.VarChar, val: req.body.ReportingTo });
    // parameters.push({ name: 'Salary', type: TYPES.Int, val: req.body.Salary });

    // Object.entries(req.body).forEach((property) => {
    //     parameters.push({ name: '@' + property[0] })
    // });

    dbContext.post("InsertEmployee", parameters, function (error, data) {
      return res.json(response(data, error));
    });
  }

  function deleteHocvien(req, res) {
    var parameters = [];

    if (req.params.idHocVien) {
      var parameters = [];

      parameters.push({
        name: "idHocVien",
        type: TYPES.Int,
        val: req.params.idHocVien,
      });

      var query = "delete from Hocvien where idHocVien = @idHocVien";

      dbContext.getQuery(query, parameters, false, function (
        error,
        data,
        rowCount
      ) {
        if (rowCount > 0) {
          return res.json({
            success: true,
            message: "Đã xóa học viên.",
          });
        }
        return res.sendStatus(404);
      });
    }
  }

  function xoakhoilop(req, res) {
    var parameters = [];

    parameters.push({
      name: "idHocVien",
      type: TYPES.Int,
      val: req.params.idHocVien,
    });

    var query = "update Hocvien set idLop = null where idHocVien = @idHocVien";

    dbContext.getQuery(query, parameters, false, function (error, data) {
      if (!error) {
        data = {
          success: true,
          message: "Đã xóa học viên khỏi lớp học.",
        };
      }
      return res.json(response(data, error));
    });
  }
  function changePass(req, res) {
    const payload = jwt.decode(req.headers.authorization);
    if (payload.role == "NV") {
      var parameters = [];
      parameters.push({
        name: "idNhanVien",
        type: TYPES.Int,
        val: payload.idNhanVien,
      });
      parameters.push({
        name: "oldPassword",
        type: TYPES.VarChar,
        val: sha256(req.body.oldPassword),
      });
      parameters.push({
        name: "newPassword",
        type: TYPES.VarChar,
        val: sha256(req.body.newPassword),
      });

      var query =
        "update NhanVien set matkhauNV = @newPassword where idNhanVien = @idNhanVien and matkhauNV = @oldPassword";

      dbContext.getQuery(query, parameters, false, function (error, data) {
        console.log(error, data);
        if (!error) {
          if (data) {
            data = {
              success: true,
              message: "Thay đổi mật khẩu thành công.",
            };
          } else {
            data = {
              success: false,
              message: "Mật khẩu cũ không chính xác.",
            };
          }
        }
        return res.json(response(data, error));
      });
    } else {
      var parameters = [];
      parameters.push({
        name: "idHocVien",
        type: TYPES.Int,
        val: payload.idHocVien,
      });
      parameters.push({
        name: "oldPassword",
        type: TYPES.VarChar,
        val: sha256(req.body.oldPassword),
      });
      parameters.push({
        name: "newPassword",
        type: TYPES.VarChar,
        val: sha256(req.body.newPassword),
      });

      var query =
        "update HocVien set matkhauHV = @newPassword where idHocVien = @idHocVien and matkhauHV = @oldPassword";

      dbContext.getQuery(query, parameters, false, function (error, data) {
        console.log(error, data);
        if (!error) {
          if (data) {
            data = {
              success: true,
              message: "Thay đổi mật khẩu thành công.",
            };
          } else {
            data = {
              success: false,
              message: "Mật khẩu cũ không chính xác.",
            };
          }
        }
        return res.json(response(data, error));
      });
    }
  }

  function getEmployeesWothDepartment(req, res) {
    dbContext.get("GetEmployeeWithDepartment", function (error, data) {
      return res.json(response(data, error));
    });
  }

  function SearchEmployee(req, res) {
    var parameters = [];

    parameters.push({ name: "Salary", type: TYPES.Int, val: req.query.salary });

    var query = "select * from tbl_employee where salary>=@Salary";

    dbContext.get(query, parameters, function (error, data) {
      return res.json(response(data, error));
    });
  }

  return {
    getAll: getHocviens,
    get: getHocvien,
    insert: insertHocviens,
    update: updateHocviens,
    put: putEmployee,
    getMulti: getEmployeesWothDepartment,
    find: SearchEmployee,
    intercept: findHocvien,
    delete: deleteHocvien,
    getMyInfo: getMyInfo,
    themVaoLop: themVaoLop,
    xoakhoilop: xoakhoilop,
    getByTKHV: getByTKHV,
    changePass: changePass,
  };
}

module.exports = HocvienRepository;
