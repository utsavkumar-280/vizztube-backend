const express = require("express");
const { get } = require("lodash");
const router = express.Router();

const {
	getAllVideos,
	addNewVideo,
	getVideoById,
} = require("../controllers/videos.controller");

router.route("/").get(getAllVideos).post(addNewVideo);

router.route("/:vidId").get(getVideoById);
module.exports = router;
