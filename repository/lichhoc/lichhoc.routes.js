const _lichhocRepository = require("./lichhoc.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");

module.exports = function (router) {
  const lichhocRepository = _lichhocRepository(dbContext);

  router
    .route("/lichhocs")
    .get(roleMiddleware("NV"), lichhocRepository.getAll)
    .post(roleMiddleware("NV"), lichhocRepository.insert)
    .put(roleMiddleware("NV"), lichhocRepository.update);

  // router.route('/employees/department')
  //     .get(employeeRepository.getMulti);
  router.route("/lichhocs/lop/:id").get(lichhocRepository.getByIdLop);
  router.route("/lichhocs/hocvien/:id").get(lichhocRepository.getByIdHocVien);

  router.use("/lichhocs/:idLichHoc", lichhocRepository.intercept);

  router
    .route("/lichhocs/:idLichHoc")
    .get(lichhocRepository.get)
    .put(roleMiddleware("NV"), lichhocRepository.put)
    .delete(roleMiddleware("NV"), lichhocRepository.delete);
};
