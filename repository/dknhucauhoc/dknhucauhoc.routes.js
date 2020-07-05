const _dknhucauhocRepository = require("./dknhucauhoc.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");

module.exports = function (router) {
  const dknhucauhocRepository = _dknhucauhocRepository(dbContext);

  router
    .route("/dknhucauhocs")
    .get(dknhucauhocRepository.getAll)
    .post(dknhucauhocRepository.insert)
    .put(dknhucauhocRepository.update);

  router
    .route("/dknhucauhocs/getByIdNhuCauHoc/:idNhuCauHoc")
    .get(dknhucauhocRepository.getByIdNhuCauHoc);

  router.use("/dknhucauhocs/:idDKNhuCauHoc", dknhucauhocRepository.intercept);

  router
    .route("/dknhucauhocs/:idDKNhuCauHoc")
    .get(dknhucauhocRepository.get)
    .put(dknhucauhocRepository.put)
    .delete(dknhucauhocRepository.delete);
};
