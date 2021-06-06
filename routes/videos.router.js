const express = require("express");
const router = express.Router();

const {
	getAllVideos,
	addNewVideo,
} = require("../controllers/videos.controller");

router.route("/").get(getAllVideos).post(addNewVideo);

module.exports = router;
