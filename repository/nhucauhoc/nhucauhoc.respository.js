var response = require("../../shared/response");
var TYPES = require("tedious").TYPES;

function HocvienRepository(dbContext) {
  function findNhuCauHoc(req, res, next) {
    if (req.params.idNhuCau) {
      var parameters = [];

      parameters.push({
        name: "idNhuCau",
        type: TYPES.Int,
        val: req.params.idNhuCau,
      });

      var query = "select * from NhuCauHoc where idNhuCau = @idNhuCau";

      dbContext.getQuery(query, parameters, false, function (error, data) {
        if (data) {
          req.data = data[0];
          return next();
        }
        return res.sendStatus(404);
      });
    }
  }

  function getNhuCauHocs(req, res) {
    dbContext.get("GetNhucauhoc", function (error, data) {
      if (!error) data.success = true;
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

    var checkHocVien = "select idLop from HocVien where idHocVien=@idHocVien";
    dbContext.getQuery(checkHocVien, parameters, false, function (error, data) {
      // console.log(data, error);
      if (data[0].idLop) {
        data = {
          success: true,
          daXepLop: true,
          message: "Bạn đã được xếp lớp.",
        };
        return res.json(response(data, error));
      }
      var query =
        "select * from NhucauHoc inner join DKNhuCauHoc on NhucauHoc.idNhuCau = DKNhuCauHoc.idNhuCau where idHocVien=@idHocVien";

      dbContext.getQuery(query, parameters, false, function (error, data) {
        if (error) {
          return res.json(response(data, error));
        }
        if (!data) {
          getNhuCauHocs(req, res);
        } else {
          data = {
            success: true,
            daDangKy: true,
            data,
          };
          return res.json(response(data, error));
        }
      });
    });
  }

  function GetNhuCauHoc(req, res) {
    return res.json(req.data);
  }

  function insertNhuCauHocs(req, res) {
    var parameters = [];

    parameters.push({
      name: "tennhucau",
      type: TYPES.NVarChar,
      val: req.body.tennhucau,
    });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("InsertNhucauhoc", parameters, function (error, data) {
      if (!error) {
        data = {
          success: true,
          data,
        };
      }
      return res.json(response(data, error));
    });
  }

  function updateNhuCauHocs(req, res) {
    var parameters = [];

    parameters.push({
      name: "tennhucau",
      type: TYPES.NVarChar,
      val: req.body.tennhucau,
    });
    parameters.push({
      name: "idNhuCau",
      type: TYPES.Int,
      val: req.body.idNhuCau,
    });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("UpdateNhucauhoc", parameters, function (error, data) {
      if (!error) {
        data = {
          success: true,
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

  function deleteNhuCauHoc(req, res) {
    var parameters = [];

    if (req.params.idNhuCau) {
      var parameters = [];

      parameters.push({
        name: "idNhuCau",
        type: TYPES.Int,
        val: req.data.idNhuCau,
      });

      var query = "delete from NhuCauHoc where idNhuCau = @idNhuCau";

      dbContext.getQuery(query, parameters, false, function (
        error,
        data,
        rowCount
      ) {
        if (rowCount > 0) {
          return res.json({
            success: true,
            message: "Xóa nhu cầu học thành công.",
          });
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
    getAll: getNhuCauHocs,
    get: GetNhuCauHoc,
    insert: insertNhuCauHocs,
    update: updateNhuCauHocs,
    put: putEmployee,
    getMulti: getEmployeesWothDepartment,
    find: SearchEmployee,
    intercept: findNhuCauHoc,
    delete: deleteNhuCauHoc,
    getByIdHocVien: getByIdHocVien,
  };
}

module.exports = HocvienRepository;
