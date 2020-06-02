var response = require("../../shared/response");
var TYPES = require("tedious").TYPES;

function HocvienRepository(dbContext) {
  function findLop(req, res, next) {
    if (req.params.idLop) {
      var parameters = [];

      parameters.push({
        name: "idLop",
        type: TYPES.Int,
        val: req.params.idLop,
      });

      var query = "select * from Lop where idLop = @idLop";

      dbContext.getQuery(query, parameters, false, function (error, data) {
        if (data) {
          req.data = data[0];
          return next();
        }
        return res.sendStatus(404);
      });
    }
  }

  function getLops(req, res) {
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
      dbContext.get("GetLop", function (error, data) {
        return res.json(response(data, error));
      });
    }
  }

  function getLop(req, res) {
    return res.json(req.data);
  }

  function insertLops(req, res) {
    var parameters = [];

    parameters.push({
      name: "malop",
      type: TYPES.VarChar,
      val: req.body.malop,
    });
    parameters.push({
      name: "tenlop",
      type: TYPES.NVarChar,
      val: req.body.tenlop,
    });
    parameters.push({ name: "idNhom", type: TYPES.Int, val: req.body.idNhom });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("InsertLop", parameters, function (error, data) {
      return res.json(response(data, error));
    });
  }

  function updateLops(req, res) {
    var parameters = [];

    parameters.push({
      name: "malop",
      type: TYPES.VarChar,
      val: req.body.malop,
    });
    parameters.push({
      name: "tenlop",
      type: TYPES.NVarChar,
      val: req.body.tenlop,
    });
    parameters.push({ name: "idNhom", type: TYPES.Int, val: req.body.idNhom });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("UpdateLop", parameters, function (error, data) {
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

  function deleteLop(req, res) {
    var parameters = [];

    if (req.params.idLop) {
      var parameters = [];

      parameters.push({
        name: "idLop",
        type: TYPES.Int,
        val: req.params.idLop,
      });

      var query = "delete from Lop where idLop = @idLop";

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
    getAll: getLops,
    get: getLop,
    insert: insertLops,
    update: updateLops,
    put: putEmployee,
    getMulti: getEmployeesWothDepartment,
    find: SearchEmployee,
    intercept: findLop,
    delete: deleteLop,
  };
}

module.exports = HocvienRepository;
