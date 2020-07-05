const _hocvienRepository = require("./nhucauhoc.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");

module.exports = function (router) {
  const hocvienRepository = _hocvienRepository(dbContext);

  router
    .route("/nhucauhocs")
    .get(hocvienRepository.getAll)
    .post(roleMiddleware("NV"), hocvienRepository.insert)
    .put(roleMiddleware("NV"), hocvienRepository.update);

  // router.route('/employees/department')
  //     .get(employeeRepository.getMulti);

  router.route("/nhucauhocs/hocvien/:id").get(hocvienRepository.getByIdHocVien);

  router.use("/nhucauhocs/:id", hocvienRepository.intercept);

  router
    .route("/nhucauhocs/:id")
    .get(hocvienRepository.get)
    .put(roleMiddleware("NV"), hocvienRepository.put)
    .delete(roleMiddleware("NV"), hocvienRepository.delete);
};
