var response = require("../../shared/response");
var TYPES = require("tedious").TYPES;

function HocvienRepository(dbContext) {
  function findDiemDanh(req, res, next) {
    if (req.params.idDiemDanh) {
      var parameters = [];

      parameters.push({
        name: "idDiemDanh",
        type: TYPES.Int,
        val: req.params.idDiemDanh,
      });

      var query = "select * from DiemDanh where idDiemDanh = @idDiemDanh";

      dbContext.getQuery(query, parameters, false, function (error, data) {
        if (data) {
          req.data = data[0];
          return next();
        }
        return res.sendStatus(404);
      });
    }
  }

  function getDiemdanhs(req, res) {
    dbContext.get("GetDiemdanh", function (error, data) {
      return res.json(response(data, error));
    });
  }

  function getDiemDanh(req, res) {
    return res.json(req.data);
  }

  function insertDiemDanhs(req, res) {
    var parameters = [];

    parameters.push({
      name: "tuan",
      type: TYPES.Int,
      val: req.body.tuan,
    });
    parameters.push({
      name: "ngayhoc",
      type: TYPES.DateTime,
      val: new Date(req.body.ngayhoc),
    });
    parameters.push({
      name: "cahoc",
      type: TYPES.int,
      val: req.body.cahoc,
    });
    parameters.push({
      name: "ghichu",
      type: TYPES.VarChar,
      val: req.body.ghichu,
    });
    parameters.push({
      name: "trangthai",
      type: TYPES.VarChar,
      val: req.body.trangthai,
    });
    parameters.push({
      name: "idHocVien",
      type: TYPES.int,
      val: req.body.idHocVien,
    });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("insertDiemdanh", parameters, function (error, data) {
      return res.json(response(data, error));
    });
  }

  function updateDiemDanhs(req, res) {
    var parameters = [];

    parameters.push({
      name: "tuan",
      type: TYPES.Int,
      val: req.body.tuan,
    });
    parameters.push({
      name: "ngayhoc",
      type: TYPES.DateTime,
      val: new Date(req.body.ngayhoc),
    });
    parameters.push({
      name: "cahoc",
      type: TYPES.int,
      val: req.body.cahoc,
    });
    parameters.push({
      name: "ghichu",
      type: TYPES.VarChar,
      val: req.body.ghichu,
    });
    parameters.push({
      name: "trangthai",
      type: TYPES.VarChar,
      val: req.body.trangthai,
    });
    parameters.push({
      name: "idHocVien",
      type: TYPES.int,
      val: req.body.idHocVien,
    });

    // Object.entries(employee).forEach((property)=>{
    //     parameters.push({name:'@'+property[0]})
    // });

    dbContext.post("updateDiemdanh", parameters, function (error, data) {
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

  function deleteDiemDanh(req, res) {
    var parameters = [];

    if (req.params.idDiemDanh) {
      var parameters = [];

      parameters.push({
        name: "idDiemDanh",
        type: TYPES.Int,
        val: req.data.idDiemDanh,
      });

      var query = "delete from DiemDanh where idDiemDanh = @idDiemDanh";

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
    getAll: getDiemdanhs,
    get: getDiemDanh,
    insert: insertDiemDanhs,
    update: updateDiemDanhs,
    put: putEmployee,
    getMulti: getEmployeesWothDepartment,
    find: SearchEmployee,
    intercept: findDiemDanh,
    delete: deleteDiemDanh,
  };
}

module.exports = HocvienRepository;
