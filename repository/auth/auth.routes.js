const _authRepository = require("./auth.respository");
const dbContext = require("../../Database/dbContext");

module.exports = function (router) {
  const authRepository = _authRepository(dbContext);

  router.route("/hocviens").post(authRepository.dangNhapHocVien);

  router.route("/nhanviens").post(authRepository.dangNhapNhanVien);
};
