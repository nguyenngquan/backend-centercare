const _lopRepository = require("./lop.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");

module.exports = function (router) {
  const lopRepository = _lopRepository(dbContext);

  router
    .route("/lops")
    .get(lopRepository.getAll)
    .post(roleMiddleware("NV"), lopRepository.insert)
    .put(roleMiddleware("NV"), lopRepository.update);

  // router.route('/employees/department')
  //     .get(employeeRepository.getMulti);

  router.use("/lops/:idLop", lopRepository.intercept);

  router
    .route("/lops/:idLop")
    .get(lopRepository.get)
    .put(roleMiddleware("NV"), lopRepository.put)
    .delete(roleMiddleware("NV"), lopRepository.delete);
};
