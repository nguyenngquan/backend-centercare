const _ketquahoctapRepository = require("./ketquahoctap.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");

module.exports = function (router) {
  const ketquahoctapRepository = _ketquahoctapRepository(dbContext);

  router
    .route("/kqhts")
    .get(ketquahoctapRepository.getAll)
    .post(roleMiddleware("NV"), ketquahoctapRepository.insert)
    .put(roleMiddleware("NV"), ketquahoctapRepository.update);

  // router.route('/employees/department')
  //     .get(employeeRepository.getMulti);
  router.route("/kqhts/hocvien/:id").get(ketquahoctapRepository.getByIdHocVien);
  router.route("/kqhts/baikiemtra").get(ketquahoctapRepository.getByIdKiemTra);
  router.use("/kqhts/:id", ketquahoctapRepository.intercept);

  router
    .route("/kqhts/:id")
    .get(ketquahoctapRepository.get)
    .put(roleMiddleware("NV"), ketquahoctapRepository.put)
    .delete(roleMiddleware("NV"), ketquahoctapRepository.delete);
};
