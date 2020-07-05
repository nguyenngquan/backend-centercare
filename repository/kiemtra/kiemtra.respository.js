var response = require("../../shared/response");
var TYPES = require("tedious").TYPES;

function HocvienRepository(dbContext) {
  function findKiemTra(req, res, next) {
    if (req.params.idKiemTra) {
      var parameters = [];

      parameters.push({
        name: "idKiemTra",
        type: TYPES.Int,
        val: req.params.idKiemTra,
      });

      var query = "select * from KiemTra where idKiemTra = @idKiemTra";

      dbContext.getQuery(query, parameters, false, function (error, data) {
        if (data) {
          req.data = data[0];
          return next();
        }
        return res.sendStatus(404);
      });
    }
  }

  function getKiemtras(req, res) {
    if (req.query.salary) {
      var parameters = [];

      parameters.push({
        name: "Salary",
        type: TYPES.Int,
        val: req.query.salary,
      });

      var query = "select * from tbl_employee where salary>=@Salary";

      dbContext.getQuery(query, parameters, false, function (error, data) {
        return res.json(response(data, error));
      });
    } else {
      dbContext.get("GetKiemtra", function (error, data) {
        return res.json(response(data, error));
      });
    }
  }
  function getByIdLop(req, res) {
    var parameters = [];
    parameters.push({
      name: "idLop",
      type: TYPES.Int,
      val: req.params.id,
    });
    console.log(req.params);
    var query =
      "select idKiemTra, ngaykiemtra, loaibaiKT, ghichu from KiemTra inner join Lop on Lop.idLop = KiemTra.idLop where Lop.idLop = @idLop";

    dbContext.getQuery(query, parameters, false, function (error, data) {
      data = {
        success: true,
        data,
      };
      return res.json(response(data, error));
    });
  }
  function getByIdHocVien(req, res) {
    var parameters = [];
    parameters.push({
      name: "idHocVien",
      type: TYPES.Int,
      val: req.params.id,
    });
    console.log(req.params);
    var query =
      "select idKiemTra, ngaykiemtra, loaibaiKT, ghichu from KiemTra inner join Lop on Lop.idLop = KiemTra.idLop inner join HocVien on HocVien.idLop = Lop.idLop where HocVien.idHocVien = @idHocVien";

    dbContext.getQuery(query, parameters, false, function (error, data) {
      data = {
        success: true,
        data: data ? data : [],
      };
      return res.json(response(data, error));
    });
  }

  function getKiemTra(req, res) {
    return res.json(req.data);
  }

  function insertKiemTras(req, res) {
    var parameters = [];

    parameters.push({
      name: "ngaykiemtra",
      type: TYPES.DateTime,
      val: new Date(req.body.ngaykiemtra),
    });
    parameters.push({
      name: "loaibaiKT",
      type: TYPES.NVarChar,
      val: req.body.loaibaiKT,
    });
    parameters.push({
      name: "ghichu",
      type: TYPES.NVarChar,
      val: req.body.ghichu,
    });
    parameters.push({ name: "idLop", type: TYPES.Int, val: req.body.idLop });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("insertKiemtra", parameters, function (error, data) {
      if (!error) {
        data = {
          success: true,
          message: "Đã thêm bài kiểm tra mới.",
          data,
        };
      }
      return res.json(response(data, error));
    });
  }

  function updateKiemTras(req, res) {
    var parameters = [];

    parameters.push({
      name: "idKiemTra",
      type: TYPES.Int,
      val: req.body.idKiemTra,
    });
    parameters.push({
      name: "ngaykiemtra",
      type: TYPES.DateTime,
      val: new Date(req.body.ngaykiemtra),
    });
    parameters.push({
      name: "loaibaiKT",
      type: TYPES.NVarChar,
      val: req.body.loaibaiKT,
    });
    parameters.push({
      name: "ghichu",
      type: TYPES.NVarChar,
      val: req.body.ghichu,
    });
    parameters.push({ name: "idLop", type: TYPES.Int, val: req.body.idLop });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("updateKiemtra", parameters, function (error, data) {
      if (!error) {
        data = {
          success: true,
          message: "Đã cập nhật thông tin bài kiểm tra.",
          data,
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

  function deleteKiemTra(req, res) {
    var parameters = [];

    if (req.params.idKiemTra) {
      var parameters = [];

      parameters.push({
        name: "idKiemTra",
        type: TYPES.Int,
        val: req.data.idKiemTra,
      });

      var query = "delete from KiemTra where idKiemTra = @idKiemTra";

      dbContext.getQuery(query, parameters, false, function (
        error,
        data,
        rowCount
      ) {
        if (rowCount > 0) {
          return res.json("Record is deleted");
        }
        return res.sendStatus(404);
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
    getAll: getKiemtras,
    get: getKiemTra,
    insert: insertKiemTras,
    update: updateKiemTras,
    put: putEmployee,
    getMulti: getEmployeesWothDepartment,
    find: SearchEmployee,
    intercept: findKiemTra,
    delete: deleteKiemTra,
    getByIdLop: getByIdLop,
    getByIdHocVien: getByIdHocVien,
  };
}

module.exports = HocvienRepository;
