const _nhomlopRepository = require("./nhomlop.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");

module.exports = function (router) {
  const nhomlopRepository = _nhomlopRepository(dbContext);

  router
    .route("/nhomlops")
    .get(nhomlopRepository.getAll)
    .post(roleMiddleware("NV"), nhomlopRepository.insert)
    .put(roleMiddleware("NV"), nhomlopRepository.update);

  // router.route('/employees/department')
  //     .get(nhomlopRepository.getMulti);

  router.use("/nhomlops/:idNhom", nhomlopRepository.intercept);

  router
    .route("/nhomlops/:idNhom")
    .get(nhomlopRepository.get)
    .put(roleMiddleware("NV"), nhomlopRepository.put)
    .delete(roleMiddleware("NV"), nhomlopRepository.delete);
};
