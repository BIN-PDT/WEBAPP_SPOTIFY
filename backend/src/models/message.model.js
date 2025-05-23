import mongoose from "mongoose";

const schema = new mongoose.Schema(
	{
		senderId: {
			type: String,
			required: true,
		},
		receiverId: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
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

export const Message = mongoose.model("Message", schema);
