const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const VideoSchema = new Schema({
	title: {
		type: String,
		required: "Title of the video is required",
	},
	vidURL: {
		type: String,
		required: "vidURL of the video is required",
	},
	category: {
		type: String,
		required: "Category of the video is required",
	},
	thumbnail: {
		type: String,
	},
	author: {
		type: String,
	},
	authorImg: {
		type: String,
	},
});

const Video = model("Video", VideoSchema);

module.exports = { Video };
