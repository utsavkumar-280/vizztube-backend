const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

const getUserDetails = async (req, res) => {
	const { user } = req;
	res.status(200).json({
		response: {
			email: user.email,
			firstname: user.firstname,
			lastname: user.lastname,
		},
	});
	try {
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Getting User details failed",
			errorMessage: error.message,
		});
	}
};

const createUser = async (req, res) => {
	try {
		const userDetails = req.body;
		const isExistingUser = await User.findOne({ email: userDetails.email });

		if (isExistingUser) {
			res.status(409).json({ message: "User with this email already exists." });
			return;
		}

		const NewUser = new User(userDetails);
		const salt = await bcrypt.genSalt(10);
		NewUser.password = await bcrypt.hash(NewUser.password, salt);
		await NewUser.save();

		res.status(201).json({ message: "User is Signed in" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Signing Up failed",
			errorMessage: error.message,
		});
	}
};

const userAuthenticator = async (req, res) => {
	try {
		const email = req.header("email");
		const password = req.header("password");

		const user = await User.findOne({ email });

		if (user) {
			const isPasswordCorrect = await bcrypt.compare(password, user.password);

			if (isPasswordCorrect) {
				const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
					expiresIn: "48h",
				});
				res
					.status(200)
					.json({ response: { firstname: user.firstname, token } });
			} else {
				res.status(403).json({ message: " password is incorrect" });
			}
		} else {
			res.status(403).json({ message: "email  is incorrect" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: " Login failed",
			errorMessage: error.message,
		});
	}
};

const updatePassword = async (req, res) => {
	try {
		const userDetails = req.body;
		let user = await User.findOne({ email: userDetails.email });
		console.log({ user });

		if (!user) {
			res.status(403).json({ message: "User does not exists" });
		}

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(userDetails.password, salt);
		user = await user.save();

		res.status(200).json({ message: "User password updated" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Updating password failed",
			errorMessage: error.message,
		});
	}
};

module.exports = {
	getUserDetails,
	createUser,
	userAuthenticator,
	updatePassword,
};
