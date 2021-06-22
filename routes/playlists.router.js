const express = require("express");
const router = express.Router();
const {
	createPlaylist,
	getAllPlaylists,
	getPlaylist,
	updatePlaylist,
	deletePlaylist,
	modifyVideosInPlaylist,
} = require("../controllers/playlists.controller");

router.route("/").get(getAllPlaylists).post(createPlaylist);

router.param("playlistId", getPlaylist);

router.route("/:playlistId").post(updatePlaylist).delete(deletePlaylist);
router.route("/:playlistId/videos").post(modifyVideosInPlaylist);
module.exports = router;
