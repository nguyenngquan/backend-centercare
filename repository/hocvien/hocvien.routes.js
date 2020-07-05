const _hocvienRepository = require("./hocvien.respository");
const dbContext = require("../../Database/dbContext");
const roleMiddleware = require("../../middleware/roleMiddleware");
module.exports = function (router) {
  const hocvienRepository = _hocvienRepository(dbContext);

  // router.use("/hocviens", roleMiddleware("NV"));
  router
    .route("/hocviens")
    .get(hocvienRepository.getAll)
    .post(hocvienRepository.insert)
    .put(hocvienRepository.update);

  // router.route('/employees/department')
  //     .get(employeeRepository.getMulti);

  router
    .route("/hocviens/taikhoan/:taikhoanHV")
    .get(hocvienRepository.getByTKHV);
  router.route("/hocviens/doimatkhau").post(hocvienRepository.changePass);
  router.route("/hocviens/myaccount").get(hocvienRepository.getMyInfo);
  router.route("/hocviens/themvaolop").post(hocvienRepository.themVaoLop);
  router
    .route("/hocviens/xoakhoilop/:idHocVien")
    .delete(hocvienRepository.xoakhoilop);
  router.use("/hocviens/:idHocVien", hocvienRepository.intercept);

  router
    .route("/hocviens/:idHocVien")
    .get(hocvienRepository.get)
    .put(hocvienRepository.put)
    .delete(hocvienRepository.delete);
};
