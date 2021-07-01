const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const JWT_SECRET = process.env.JWT_SECRET;

const userAuthorization = async (req, res, next) => {
	try {
		const tokenContainer = req.headers.authorization;
		const token = tokenContainer.split(" ")[1];
		const decoded = jwt.verify(token, JWT_SECRET);

		const user = await User.findById(decoded.userId);

		if (user) {
			req.user = user;
			next();
		} else {
			res.status(401).json({ message: "Unauthorized Access" });
			return;
		}
	} catch (error) {
		console.log(error);
		res
			.status(401)
			.json({ message: "Unauthorized Access", errorMessage: error.message });
	}
};

module.exports = userAuthorization;
