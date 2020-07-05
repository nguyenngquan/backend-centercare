const _baitapRepository = require("./baitap.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");

module.exports = function (router) {
  const baitapRepository = _baitapRepository(dbContext);

  router
    .route("/baitaps")
    .get(baitapRepository.getAll)
    .post(roleMiddleware("NV"), baitapRepository.insert)
    .put(roleMiddleware("NV"), baitapRepository.update);

  // router.route('/employees/department')
  //     .get(employeeRepository.getMulti);
  router.route("/baitaps/lop/:id").get(baitapRepository.getByIdLop);
  router.route("/baitaps/hocvien/:id").get(baitapRepository.getByIdHocVien);
  router.use("/baitaps/:idBaiTap", baitapRepository.intercept);

  router
    .route("/baitaps/:idBaiTap")
    .get(baitapRepository.get)
    .put(roleMiddleware("NV"), baitapRepository.put)
    .delete(roleMiddleware("NV"), baitapRepository.delete);
};
