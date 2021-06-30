const express = require("express");
const router = express.Router();
const userAuthorization = require("../middlewares/userAuthorization");

const {
	getUserDetails,
	createUser,
	userAuthenticator,
	updatePassword,
} = require("../controllers/users.controller");

router.route("/").post(createUser);
router.route("/info").get(userAuthorization, getUserDetails);
router.route("/login").post(userAuthenticator);
router.route("/password-reset").post(updatePassword);

module.exports = router;
