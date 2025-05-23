import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		artist: {
			type: String,
			required: true,
		},
		imagePid: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		releaseYear: {
			type: Number,
			required: true,
		},
		songs: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Song",
			},
		],
	},
	{ timestamps: true }
);

schema.set("toJSON", {
	transform: function (doc, ret) {
		delete ret.__v;
		return ret;
	},
});

export const Album = mongoose.model("Album", schema);
