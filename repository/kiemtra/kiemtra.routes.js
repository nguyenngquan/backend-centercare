const _kiemtraRepository = require("./kiemtra.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");

module.exports = function (router) {
  const kiemtraRepository = _kiemtraRepository(dbContext);

  router
    .route("/kiemtras")
    .get(kiemtraRepository.getAll)
    .post(roleMiddleware("NV"), kiemtraRepository.insert)
    .put(roleMiddleware("NV"), kiemtraRepository.update);

  // router.route('/employees/department')
  //     .get(employeeRepository.getMulti);
  router.route("/kiemtras/lop/:id").get(kiemtraRepository.getByIdLop);
  router.route("/kiemtras/hocvien/:id").get(kiemtraRepository.getByIdHocVien);
  router.use("/kiemtras/:idKiemTra", kiemtraRepository.intercept);

  router
    .route("/kiemtras/:idKiemTra")
    .get(kiemtraRepository.get)
    .put(roleMiddleware("NV"), kiemtraRepository.put)
    .delete(roleMiddleware("NV"), kiemtraRepository.delete);
};
