var response = require("../../shared/response");
var TYPES = require("tedious").TYPES;

function HocvienRepository(dbContext) {
  function findDKNhuCauHoc(req, res, next) {
    if (req.params.idDKNhuCauHoc) {
      var parameters = [];

      parameters.push({
        name: "idDKNhuCauHoc",
        type: TYPES.Int,
        val: req.params.idDKNhuCauHoc,
      });

      var query =
        "select * from DkNhuCauHoc where idDKNhuCauHoc = @idDKNhuCauHoc";

      dbContext.getQuery(query, parameters, false, function (error, data) {
        if (data) {
          req.data = data[0];
          return next();
        }
        return res.sendStatus(404);
      });
    }
  }

  function getDKNhucauhocs(req, res) {
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
      dbContext.get("GetDKNhucauhoc", function (error, data) {
        return res.json(response(data, error));
      });
    }
  }

  function getDKNhucauhoc(req, res) {
    return res.json(req.data);
  }

  function getByIdNhuCauHoc(req, res) {
    var parameters = [];
    parameters.push({
      name: "idNhuCau",
      type: TYPES.Int,
      val: req.params.idNhuCauHoc,
    });

    var query =
      "select * from DKNhuCauHoc inner join HocVien on DKNhuCauHoc.idHocVien = HocVien.idHocVien where idNhuCau=@idNhuCau";

    dbContext.getQuery(query, parameters, false, function (error, data) {
      if (!error) {
        if (data)
          data = {
            success: true,
            data,
          };
        else {
          data = {
            status: true,
            message: "Chưa có học viên nào đăng ký nhu cầu học này.",
          };
        }
        return res.json(response(data, error));
      } else {
        res.status(404);
        return res.json(response(data, error));
      }
    });
  }

  function insertDKNhucauhocs(req, res) {
    var parameters = [];

    parameters.push({
      name: "idHocVien",
      type: TYPES.Int,
      val: req.body.idHocVien,
    });
    parameters.push({
      name: "ngaydangky",
      type: TYPES.DateTime,
      val: new Date(req.body.ngaydangky),
    });
    parameters.push({
      name: "idNhuCau",
      type: TYPES.Int,
      val: req.body.idNhuCau,
    });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("insertDKNhucauhoc", parameters, function (error, data) {
      if (!error) {
        data = {
          success: true,
          message: "Đăng ký nhu cầu học thành công.",
        };
      }
      return res.json(response(data, error));
    });
  }
  function updateDKNhuCauHocs(req, res) {
    var parameters = [];

    parameters.push({
      name: "idHocVien",
      type: TYPES.Int,
      val: req.body.idHocVien,
    });
    parameters.push({
      name: "idNhuCau",
      type: TYPES.Int,
      val: req.body.idNhuCau,
    });
    parameters.push({
      name: "ngaydangky",
      type: TYPES.DateTime,
      val: new Date(req.body.ngaydangky),
    });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("UpdateDKNhucauhoc", parameters, function (error, data) {
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

  function deleteDKNhucauhoc(req, res) {
    var parameters = [];

    if (req.params.idDKNhuCauHoc) {
      var parameters = [];

      parameters.push({
        name: "idDKNhuCauHoc",
        type: TYPES.Int,
        val: req.data.idDKNhuCauHoc,
      });

      var query =
        "delete from DKNhuCauHoc where idDKNhuCauHoc = @idDKNhuCauHoc";

      dbContext.getQuery(query, parameters, false, function (
        error,
        data,
        rowCount
      ) {
        if (rowCount > 0) {
          return res.json({
            success: true,
            message: "Xóa đăng ký nhu cầu học thành công.",
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
    getAll: getDKNhucauhocs,
    get: getDKNhucauhoc,
    insert: insertDKNhucauhocs,
    update: updateDKNhuCauHocs,
    put: putEmployee,
    getMulti: getEmployeesWothDepartment,
    find: SearchEmployee,
    intercept: findDKNhuCauHoc,
    delete: deleteDKNhucauhoc,
    getByIdNhuCauHoc: getByIdNhuCauHoc,
  };
}

module.exports = HocvienRepository;
