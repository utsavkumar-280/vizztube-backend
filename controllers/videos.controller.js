const { Video } = require("../models/video.model");

const getAllVideos = async (req, res) => {
	try {
		const videos = await Video.find({});

		res.status(200).json({ response: videos });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				"Server Error, request failed. See error message for more details.",
			errorMessage: error.message,
		});
	}
};

const addNewVideo = async (req, res) => {
	try {
		const videoDetails = req.body;
		const NewVideo = new Video(videoDetails);
		const savedVideo = await NewVideo.save();

		res.status(201).json({ response: savedVideo });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				"Server Error, request failed. See error message for more details.",
			errorMessage: error.message,
		});
	}
};

const getVideoById = async (req, res) => {
	try {
		const { vidId } = req.params;
		console.log("vidID:", vidId);
		const videoFound = await Video.findById(vidId);
		console.log("videoFound:", videoFound);
		videoFound
			? res.status(200).json({ response: videoFound })
			: res.status(404).json({ message: "video not found in Database" });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message:
				"Server Error, request failed. See error message for more details.",
			errorMessage: error.message,
		});
	}
};

module.exports = { getAllVideos, addNewVideo, getVideoById };
