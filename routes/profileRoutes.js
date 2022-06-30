const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddlerware");
const { updateProfile, updatePasswordValidations, updatePassword } = require("../controllers/profileController");

router.post("/user/updateProfile", auth, updateProfile);
router.post(
  "/user/updatePassword",
  [auth, updatePasswordValidations],
  updatePassword
);

module.exports = router;
