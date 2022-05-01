if (process.env.USER || process.env.USERNAME) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use((req, res, next) => {
	next({ status: 404, message: `Not found: ${req.originalUrl}` });
  });

app.use((err, req, res, next) => {
	const { status = 500, message = "Something went wrong on our end!" } = err;
	res.status(status).json({ error: message });
});

module.exports = app;