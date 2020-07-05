var response = require("../../shared/response");
var TYPES = require("tedious").TYPES;

const updatedSuccess = {
  status: 200,
  message: "Update thành công",
};
const updatedError = (message) => ({
  status: 400,
  message,
});

function HocvienRepository(dbContext) {
  function findNhomLop(req, res, next) {
    if (req.params.idNhom) {
      var parameters = [];

      parameters.push({
        name: "idNhom",
        type: TYPES.Int,
        val: req.params.idNhom,
      });

      var query = "select * from NhomLop where idNhom = @idNhom";

      dbContext.getQuery(query, parameters, false, function (error, data) {
        if (data) {
          req.data = data[0];
          return next();
        }
        return res.sendStatus(404);
      });
    }
  }

  function getNhomLops(req, res) {
    dbContext.get("GetNhomlop", function (error, data) {
      if (!error) {
        data.success = true;
      }
      return res.json(response(data, error));
    });
  }

  function getLop(req, res) {
    return res.json(req.data);
  }

  function insertNhomLops(req, res) {
    var parameters = [];
    if (req.body.manhom === null) {
      res.status(404);
      return res.json(
        response(null, updatedError("Mã lớp không được bỏ trống"))
      );
    }
    if (req.body.manhom && req.body.manhom.toString().length > 10) {
      res.status(404);
      return res.json(
        response(null, updatedError("Độ dài mã lớp tối đa 10 kí tự"))
      );
    }
    parameters.push({
      name: "manhom",
      type: TYPES.VarChar,
      val: req.body.manhom,
    });
    parameters.push({
      name: "tennhom",
      type: TYPES.NVarChar,
      val: req.body.tennhom,
    });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("InsertNhomlop", parameters, function (error, data) {
      console.log(error);
      if (error !== null) res.status(404);
      return res.json(
        response(updatedSuccess, error && updatedError(error.message))
      );
    });
  }

  function updateNhomLops(req, res) {
    var parameters = [];
    if (req.body.manhom === null) {
      res.status(404);
      return res.json(
        response(null, updatedError("Mã lớp không được bỏ trống"))
      );
    }
    if (req.body.manhom && req.body.manhom.toString().length > 10) {
      res.status(404);
      return res.json(
        response(null, updatedError("Độ dài mã lớp tối đa 10 kí tự"))
      );
    }
    parameters.push({
      name: "idNhom",
      type: TYPES.Int,
      val: req.body.idNhom,
    });
    parameters.push({
      name: "manhom",
      type: TYPES.VarChar,
      val: req.body.manhom,
    });
    parameters.push({
      name: "tennhom",
      type: TYPES.NVarChar,
      val: req.body.tennhom,
    });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("UpdateNhomlop", parameters, function (error, data) {
      console.log(error);
      if (error !== null) res.status(404);
      return res.json(
        response(updatedSuccess, error && updatedError(error.message))
      );
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
      console.log(data);
      console.log(error);

      return res.json(response(data, error));
    });
  }

  function deleteNhomLop(req, res) {
    var parameters = [];

    if (req.params.idNhom) {
      var parameters = [];

      parameters.push({
        name: "idNhom",
        type: TYPES.Int,
        val: req.params.idNhom,
      });

      var query = "delete from NhomLop where idNhom = @idNhom";

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
    getAll: getNhomLops,
    get: getLop,
    insert: insertNhomLops,
    update: updateNhomLops,
    put: putEmployee,
    getMulti: getEmployeesWothDepartment,
    find: SearchEmployee,
    intercept: findNhomLop,
    delete: deleteNhomLop,
  };
}

module.exports = HocvienRepository;
