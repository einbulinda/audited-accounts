const { Router } = require("express");
const { register } = require("../controllers/userControllers");
const {
  validationMiddleware,
} = require("../middlewares/validationsMiddleware");
const { registerValidation } = require("../validators/auth");
const router = Router();

router.post("/register", registerValidation, validationMiddleware, register);

module.exports = router;
