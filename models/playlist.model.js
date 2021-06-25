const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PlaylistSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		title: {
			type: String,
			required: "Title of the playlist is required",
		},
		type: {
			type: String,
			enum: ["liked", "history", "custom"],
			default: "custom",
		},
		isDefaultPlaylist: {
			type: Boolean,
			default: false,
		},
		videos: [
			{
				video: {
					type: Schema.Types.ObjectId,
					ref: "Video",
				},
				date: {
					type: String,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const Playlist = model("Playlist", PlaylistSchema);
module.exports = { Playlist };
