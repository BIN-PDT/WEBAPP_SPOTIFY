import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		clerkId: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

schema.set("toJSON", {
	transform: function (doc, ret) {
		delete ret.__v;
		return ret;
	},
});

export const User = mongoose.model("User", schema);
