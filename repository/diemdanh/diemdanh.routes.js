const _diemdanhRepository = require("./diemdanh.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");

module.exports = function (router) {
  const diemdanhRepository = _diemdanhRepository(dbContext);
  router
    .route("/diemdanhs")
    .get(diemdanhRepository.getAll)
    .post(roleMiddleware("NV"), diemdanhRepository.insert)
    .put(roleMiddleware("NV"), diemdanhRepository.update);

  // router.route('/employees/department')
  //     .get(employeeRepository.getMulti);

  router.use("/diemdanhs/:idDiemDanh", diemdanhRepository.intercept);

  router
    .route("/diemdanhs/:idDiemDanh")
    .get(diemdanhRepository.get)
    .put(roleMiddleware("NV"), diemdanhRepository.put)
    .delete(roleMiddleware("NV"), diemdanhRepository.delete);
};
