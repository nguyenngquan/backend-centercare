const _dknhucauhocRepository = require("./dknhucauhoc.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");

module.exports = function (router) {
  const dknhucauhocRepository = _dknhucauhocRepository(dbContext);

  router
    .route("/dknhucauhocs")
    .get(dknhucauhocRepository.getAll)
    .post(roleMiddleware("NV"), dknhucauhocRepository.insert)
    .put(roleMiddleware("NV"), dknhucauhocRepository.update);

  // router.route('/employees/department')
  //     .get(employeeRepository.getMulti);

  router.use("/dknhucauhocs/:idDKNhuCauHoc", dknhucauhocRepository.intercept);

  router
    .route("/dknhucauhocs/:idDKNhuCauHoc")
    .get(dknhucauhocRepository.get)
    .put(dknhucauhocRepository.put)
    .delete(dknhucauhocRepository.delete);
};
