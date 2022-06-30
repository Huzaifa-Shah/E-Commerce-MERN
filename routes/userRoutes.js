const app = require("express");
const router = app.Router();
const {
  registerValidations,
  register,
  loginValidations,
  login,
  deleteAccount,
  updateAdmin,
} = require("../controllers/userController");
const auth = require("../middleware/authMiddlerware");

router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);
router.get("/user/updateAdmin/:id", auth, updateAdmin);
router.delete("/user/delete/:id", auth, deleteAccount);

module.exports = router;
