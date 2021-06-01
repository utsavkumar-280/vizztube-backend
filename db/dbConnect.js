const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		console.log(`MongoDB is connected successfully: ${conn.connection.host}`);
	} catch (err) {
		console.error("Mongoose connection failed", err);
	}
};

module.exports = dbConnection;
