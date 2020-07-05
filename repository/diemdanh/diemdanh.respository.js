var response = require("../../shared/response");
var TYPES = require("tedious").TYPES;
var dateUtils = require("../../common/DateUtils");

const { convertDate } = dateUtils;

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
  function getDiemDanhFromNgay(req, res) {
    var parameters = [];
    parameters.push({
      name: "ngaydiemdanh",
      type: TYPES.Date,
      val: req.query.ngaydiemdanh,
    });
    var query =
      "SELECT * FROM DiemDanh inner join HocVien on DiemDanh.idHocVien = HocVien.idHocVien WHERE DiemDanh.ngayhoc = @ngaydiemdanh";
    dbContext.getQuery(query, parameters, false, function (error, data) {
      if (error) {
        return res.json(response(data, error));
      }
      if (data) {
        data = {
          success: true,
          daDiemDanh: true,
          data,
        };
        return res.json(response(data, error));
      } else {
        var query =
          "SELECT * FROM HocVien INNER JOIN dbo.Lop ON Lop.idLop = HocVien.idLop INNER JOIN dbo.LichHoc ON LichHoc.idLop = Lop.idLop WHERE LichHoc.ngayhoc = @ngaydiemdanh";
        dbContext.getQuery(query, parameters, false, function (error, data) {
          if (!error) {
            data = {
              success: true,
              data: data ? data : [],
            };
          }
          return res.json(response(data, error));
        });
      }
    });
  }

  function getDiemDanhByMonth(req, res) {
    const { month, year } = req.query;
    const { startDate, endDate } = convertDate(year, month);
    console.log(startDate);
    console.log(endDate);

    var parameters = [];
    parameters.push({
      name: "startDate",
      type: TYPES.Date,
      val: startDate,
    });
    parameters.push({
      name: "endDate",
      type: TYPES.Date,
      val: endDate,
    });

    var query =
      "SELECT DISTINCT TOP 50 ngayhoc FROM DiemDanh WHERE DiemDanh.ngayhoc between @startDate and @endDate";

    dbContext.getQuery(query, parameters, false, function (error, data) {
      if (!error) {
        data = {
          success: true,
          data: data ? data : [],
        };
      }
      return res.json(response(data, error));
    });
  }

  function getDiemdanhs(req, res) {
    dbContext.get("GetDiemdanh", function (error, data) {
      return res.json(response(data, error));
    });
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
    var query = `INSERT INTO [dbo].DiemDanh ([tuan],[ngayhoc],[cahoc],[ghichu],[trangthai],[idHocVien])
      VALUES
      ${req.body
        .map(
          (item) => `(
        '${item.tuan}',
        '${item.ngayhoc}',
        '${item.cahoc}',
        N'${item.ghichu}',
        N'${item.trangthai}',
        '${item.idHocVien}'
      )`
        )
        .join(",")};`;

    dbContext.getQuery(query, [], false, function (error, data) {
      if (!error) {
        data = {
          success: true,
        };
      }
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
    getDiemDanhFromNgay: getDiemDanhFromNgay,
    getDiemDanhByMonth: getDiemDanhByMonth,
  };
}

module.exports = HocvienRepository;
