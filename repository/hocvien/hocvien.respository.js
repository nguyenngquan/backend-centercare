var response = require("../../shared/response");
var TYPES = require("tedious").TYPES;

function HocvienRepository(dbContext) {
  function findHocvien(req, res, next) {
    if (req.params.taikhoanHV) {
      var parameters = [];

      parameters.push({
        name: "taikhoanHV",
        type: TYPES.VarChar,
        val: req.params.taikhoanHV,
      });

      var query = "select * from HocVien where taikhoanHV = @taikhoanHV";

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
      dbContext.get("GetHocvien", function (error, data) {
        return res.json(response(data, error));
      });
    }
  }

  function getHocvien(req, res) {
    return res.json(req.data);
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
      val: req.body.matkhauHV,
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
      return res.json(response(data, error));
    });
  }

  function updateHocviens(req, res) {
    var parameters = [];

    parameters.push({
      name: "taikhoanHV",
      type: TYPES.VarChar,
      val: req.body.taikhoanHV,
    });
    parameters.push({
      name: "matkhauHV",
      type: TYPES.VarChar,
      val: req.body.matkhauHV,
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

    dbContext.post("UpdateHocvien", parameters, function (error, data) {
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

    if (req.params.taikhoanHV) {
      var parameters = [];

      parameters.push({
        name: "taikhoanHV",
        type: TYPES.Int,
        val: req.params.taikhoanHV,
      });

      var query = "delete from Hocvien where taikhoanHV = @taikhoanHV";

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
    getAll: getHocviens,
    get: getHocvien,
    insert: insertHocviens,
    update: updateHocviens,
    put: putEmployee,
    getMulti: getEmployeesWothDepartment,
    find: SearchEmployee,
    intercept: findHocvien,
    delete: deleteHocvien,
  };
}

module.exports = HocvienRepository;
