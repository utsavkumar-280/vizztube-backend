const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const videos = require("./routes/videos.router");

const dbConnection = require("./db/dbConnect.js");
const route404Handler = require("./middlewares/route404Handler");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

dbConnection();

app.get("/", (req, res) => {
	res.send("Welcome to VizzTube Apis");
});
app.get("/hellotest", (req, res) => {
	res.json({
		success: true,
		message: "Hey, What's up?",
	});
});

app.use("/videos", videos);

app.use(route404Handler);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}`);
});
