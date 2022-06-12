const { Router } = require("express");
const { register, login } = require("../controllers/userControllers");
const {
  validationMiddleware,
} = require("../middlewares/validationsMiddleware");
const { registerValidation, loginValidation } = require("../validators/auth");
const router = Router();

router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);

module.exports = router;
