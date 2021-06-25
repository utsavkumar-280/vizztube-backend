const { Playlist } = require("../models/playlist.model");
const { extend } = require("lodash");

const createPlaylist = async (req, res) => {
	try {
		let playlistDetails = req.body;
		const userId = req.user._id;
		const NewPlaylist = new Playlist({ ...userId, playlistDetails });
		let savedNewPlaylist = await NewPlaylist.save();

		savedNewPlaylist = await savedNewPlaylist
			.populate({ path: "videos.video" })
			.execPopulate();
		savedNewPlaylist.userId = null;
		res.status(201).json({ response: savedNewPlaylist });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Creating playlist failed",
			errorMessage: error.message,
		});
	}
};

const getAllPlaylists = async (req, res) => {
	try {
		const userId = req.user._id;
		let playlists = await Playlist.find({ userId }).populate({
			path: "videos.video",
		});

		if (playlists.length === 0) {
			let likedPlaylist = new Playlist({
				userId,
				title: "Liked",
				type: "liked",
				isDefaultPlaylist: true,
				videos: [],
			});
			let historyPlaylist = new Playlist({
				userId,
				title: "History",
				type: "history",
				isDefaultPlaylist: true,
				videos: [],
			});
			await Playlist.insertMany([historyPlaylist, likedPlaylist]);
			likedPlaylist.userId = null;
			historyPlaylist.userId = null;
			res.status(201).json({
				response: {
					likedPlaylist,
					historyPlaylist,
					customPlaylists: [],
				},
			});
			return;
		}

		const historyPlaylist = playlists.find(
			(playlist) => playlist.type === "history"
		);
		const likedPlaylist = playlists.find(
			(playlist) => playlist.type === "liked"
		);
		const customPlaylists = playlists.filter(
			(playlist) => playlist.type === "custom"
		);

		res.status(200).json({
			response: {
				likedPlaylist,
				historyPlaylist,
				customPlaylists,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Getting all playlists failed",
			errorMessage: error.message,
		});
	}
};

const getPlaylist = async (req, res, next, id) => {
	try {
		const userId = req.user._id;
		const playlist = await Playlist.findOne({ _id: id, userId });
		if (playlist) {
			req.playlist = playlist;
			next();
		} else {
			res
				.status(404)
				.json({ message: "Given playlist doesn't exists for the user" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Getting the playlist failed",
			errorMessage: error.message,
		});
	}
};

const updatePlaylist = async (req, res) => {
	try {
		const updateDetails = req.body;
		const playlist = req.playlist;
		let updatedPlaylist = extend(playlist, updateDetails);
		updatedPlaylist = await updatedPlaylist.save();
		updatedPlaylist = await updatedPlaylist
			.populate({ path: "videos.video" })
			.execPopulate();
		updatedPlaylist.userId = null;
		res.status(200).json({ response: updatedPlaylist });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Updating the playlist failed",
			errorMessage: error.message,
		});
	}
};

const deletePlaylist = async (req, res) => {
	try {
		const playlist = req.playlist;
		if (playlist.isDefaultPlaylist) {
			throw new Error("Cannot delete a default playlist");
		} else {
			const deletedPlaylist = await playlist.remove();
			res
				.status(200)
				.json({ message: "Playlist deleted", response: deletedPlaylist });
		}
	} catch (error) {
		res.status(500).json({
			message: "Deleting the playlist failed",
			errorMessage: error.message,
		});
	}
};

const modifyVideosInPlaylist = async (req, res) => {
	try {
		let playlist = req.playlist;
		const videoDetails = req.body;

		const isExistingVideo = playlist.videos.find(
			(vid) => vid.video === videoDetails.video
		);

		if (isExistingVideo) {
			const modifiedVideos = playlist.videos.filter(
				(vid) => vid.video !== videoDetails.video
			);
			playlist.videos = modifiedVideos;
		} else {
			playlist.videos.push(videoDetails);
		}
		playlist = await playlist.save();
		playlist = await playlist.populate({ path: "videos.video" }).execPopulate();
		playlist.userId = null;
		res.status(201).json({
			response: playlist,
		});
	} catch (error) {
		res.status(500).json({
			message: "Adding or Removing videos from the playlist failed",
			errorMessage: error.message,
		});
	}
};

module.exports = {
	createPlaylist,
	getAllPlaylists,
	getPlaylist,
	updatePlaylist,
	deletePlaylist,
	modifyVideosInPlaylist,
};
