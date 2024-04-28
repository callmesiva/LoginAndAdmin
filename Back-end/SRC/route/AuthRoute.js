const express = require("express");
const router = express.Router();
const middleware = require("../../middleware/verifyToken");
const auth = require("../controller/AuthController");
const mainValidator = require("../../middleware/validator/mainValidator");
const userValidator = require("../../middleware/validator/userValidator");

router.post("/login", auth.Login);
router.post("/signup", mainValidator(userValidator), auth.Signup);
router.get("/verify/:token", auth.VerifyMail);
router.get("/getdata", middleware.verifyToken, auth.Getdata);
router.get("/admindata", middleware.verifyToken, auth.Admindata);
router.get("/roleverify", middleware.verifyToken, auth.RoleVerify);

module.exports = router;
