const route404Handler = (req, res) => {
	res.status(404).json({
		success: false,
		message: "Oops! 404 route not found",
	});
};

module.exports = route404Handler;
