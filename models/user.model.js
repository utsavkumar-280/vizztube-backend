const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema(
	{
		firstname: {
			type: String,
			required: "firstname of the user is required",
		},
		laststname: {
			type: String,
			required: "lastname of the user is required",
		},
		email: {
			type: String,
			unique: "User with this email already exists",
			validate: {
				validator: function (val) {
					/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						val
					);
				},
				message: (props) => `${props.val} is not a valid email address`,
			},
		},
		password: {
			type: String,
			unique: "Password is required",
			validate: {
				validator: function (val) {
					return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
						val
					);
				},
				message: (props) =>
					"password should contain atleast one number,one uppercase character,one lowercase character and should be of minimum 8 characters in length. ",
			},
		},
	},
	{
		timestamps: true,
	}
);

const User = model("User", UserSchema);

module.exports = { User };
