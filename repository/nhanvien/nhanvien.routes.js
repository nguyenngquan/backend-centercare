const _hocvienRepository = require("./nhanvien.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");

module.exports = function (router) {
  const hocvienRepository = _hocvienRepository(dbContext);

  router
    .route("/nhanviens")
    .get(roleMiddleware("NV"), hocvienRepository.getAll)
    .post(roleMiddleware("NV"), hocvienRepository.post);

  // router.route('/employees/department')
  //     .get(employeeRepository.getMulti);

  // router.use('/employees/:employeeId', employeeRepository.intercept);

  // router.route('/employees/:employeeId')
  //     .get(employeeRepository.get)
  //     .put(employeeRepository.put)
  //     .delete(employeeRepository.delete);
};
