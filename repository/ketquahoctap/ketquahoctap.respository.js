var response = require("../../shared/response");
var TYPES = require("tedious").TYPES;

function HocvienRepository(dbContext) {
  function findKQHT(req, res, next) {
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

  function getKQHTs(req, res) {
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
      dbContext.get("GetKQHT", function (error, data) {
        return res.json(response(data, error));
      });
    }
  }

  function getKQHT(req, res) {
    return res.json(req.data);
  }

  function insertKQHTs(req, res) {
    var parameters = [];

    parameters.push({
      name: "idHocVien",
      type: TYPES.Int,
      val: req.body.idHocVien,
    });
    parameters.push({
      name: "idKiemTra",
      type: TYPES.Int,
      val: req.body.idKiemTra,
    });
    parameters.push({ name: "diem", type: TYPES.Int, val: req.body.diem });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("InsertKQHT", parameters, function (error, data) {
      return res.json(response(data, error));
    });
  }

  function updateKQHTs(req, res) {
    var parameters = [];

    parameters.push({
      name: "idHocVien",
      type: TYPES.Int,
      val: req.body.idHocVien,
    });
    parameters.push({
      name: "idKiemTra",
      type: TYPES.Int,
      val: req.body.idKiemTra,
    });
    parameters.push({ name: "diem", type: TYPES.Int, val: req.body.diem });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("UpdateKQHT", parameters, function (error, data) {
      return res.json(response(data, error));
    });
  }

  function putKQHT(req, res) {
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

    dbContext.post("InsertKQHT", parameters, function (error, data) {
      return res.json(response(data, error));
    });
  }

  function deleteKQHT(req, res) {
    var parameters = [];

    if (req.params.id) {
      var parameters = [];

      parameters.push({
        name: "id",
        type: TYPES.Int,
        val: req.params.id,
      });

      var query = "delete from KetQuaHocTap where id = @id";

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
    getAll: getKQHTs,
    get: getKQHT,
    insert: insertKQHTs,
    update: updateKQHTs,
    put: putKQHT,
    getMulti: getEmployeesWothDepartment,
    find: SearchEmployee,
    intercept: findKQHT,
    delete: deleteKQHT,
  };
}

module.exports = HocvienRepository;
