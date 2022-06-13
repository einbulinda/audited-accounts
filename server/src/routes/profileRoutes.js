const { Router } = require("express");
const { createProfile } = require("../controllers/profileControllers");
const { userAuth } = require("../middlewares/authMiddleware");

const router = Router();

router.post("/create", userAuth, createProfile);

module.exports = router;
