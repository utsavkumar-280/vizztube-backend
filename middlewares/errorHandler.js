const errorHandler = (err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "500 Internal server error. See errorMessage for more details",
		errorMessage: err.message,
	});
};

module.exports = errorHandler;
