const _hocvienRepository = require("./hocvien.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");
module.exports = function (router) {
  const hocvienRepository = _hocvienRepository(dbContext);

  router.use("/hocviens", roleMiddleware("NV"));
  router
    .route("/hocviens")
    .get(hocvienRepository.getAll)
    .post(hocvienRepository.insert)
    .put(hocvienRepository.update);

  // router.route('/employees/department')
  //     .get(employeeRepository.getMulti);

  router.use("/hocviens/:taikhoanHV", hocvienRepository.intercept);

  router
    .route("/hocviens/:taikhoanHV")
    .get(hocvienRepository.get)
    .put(hocvienRepository.put)
    .delete(hocvienRepository.delete);
};
