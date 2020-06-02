var response = require("../../shared/response");
var TYPES = require("tedious").TYPES;

function HocvienRepository(dbContext) {
  function findLichHoc(req, res, next) {
    if (req.params.idLichHoc) {
      var parameters = [];

      parameters.push({
        name: "idLichHoc",
        type: TYPES.Int,
        val: req.params.idLichHoc,
      });

      var query = "select * from LichHoc where idLichHoc = @idLichHoc";

      dbContext.getQuery(query, parameters, false, function (error, data) {
        if (data) {
          req.data = data[0];
          return next();
        }
        return res.sendStatus(404);
      });
    }
  }

  function getLichHocs(req, res) {
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
      dbContext.get("GetLichhoc", function (error, data) {
        return res.json(response(data, error));
      });
    }
  }

  function getLichHoc(req, res) {
    return res.json(req.data);
  }

  function insertLichHocs(req, res) {
    var parameters = [];

    parameters.push({ name: "tuan", type: TYPES.VarChar, val: req.body.tuan });
    parameters.push({
      name: "ngayhoc",
      type: TYPES.DateTime,
      val: new Date(req.body.ngayhoc),
    });
    parameters.push({
      name: "cahoc",
      type: TYPES.VarChar,
      val: req.body.cahoc,
    });
    parameters.push({
      name: "ghichu",
      type: TYPES.VarChar,
      val: req.body.ghichu,
    });
    parameters.push({ name: "idLop", type: TYPES.Int, val: req.body.idLop });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("insertLichhoc", parameters, function (error, data) {
      return res.json(response(data, error));
    });
  }

  function updateLichHocs(req, res) {
    var parameters = [];

    parameters.push({ name: "tuan", type: TYPES.VarChar, val: req.body.tuan });
    parameters.push({
      name: "ngayhoc",
      type: TYPES.DateTime,
      val: new Date(req.body.ngayhoc),
    });
    parameters.push({
      name: "cahoc",
      type: TYPES.VarChar,
      val: req.body.cahoc,
    });
    parameters.push({
      name: "ghichu",
      type: TYPES.VarChar,
      val: req.body.ghichu,
    });
    parameters.push({ name: "idLop", type: TYPES.Int, val: req.body.idLop });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("updateLichhoc", parameters, function (error, data) {
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

    // parameters.push({ name: 'tuan', type: TYPES.VarChar, val: req.body.tuan });
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

  function deleteLichHoc(req, res) {
    var parameters = [];

    if (req.params.idLichHoc) {
      var parameters = [];

      parameters.push({
        name: "idLichHoc",
        type: TYPES.Int,
        val: req.data.idLichHoc,
      });

      var query = "delete from LichHoc where idLichHoc = @idLichHoc";

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
    getAll: getLichHocs,
    get: getLichHoc,
    insert: insertLichHocs,
    update: updateLichHocs,
    put: putEmployee,
    getMulti: getEmployeesWothDepartment,
    find: SearchEmployee,
    intercept: findLichHoc,
    delete: deleteLichHoc,
  };
}

module.exports = HocvienRepository;
