const express = require("express");
const router = express.Router();
const {
	createPlaylist,
	getAllPlaylists,
	getPlaylist,
	updatePlaylist,
	deletePlaylist,
	modifyVideosInPlaylist,
	addVideosInPlaylist,
} = require("../controllers/playlists.controller");

router.route("/").get(getAllPlaylists).post(createPlaylist);

router.param("playlistId", getPlaylist);

router.route("/:playlistId").post(updatePlaylist).delete(deletePlaylist);
router.route("/:playlistId/videos").post(modifyVideosInPlaylist);
router.route("/:playlistId/videos/add").post(addVideosInPlaylist);
module.exports = router;
