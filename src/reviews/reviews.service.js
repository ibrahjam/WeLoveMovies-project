const knex = require("../db/connection");

function read(reviewId) {
	return knex("reviews")
		.select("*")
		.where({ review_id: reviewId })
		.first();
}

function destroy(reviewId) {
	return knex("reviews")
		.where({ review_id: reviewId })
		.del();
}

function update(review) {
	return knex("reviews")
		.select("*")
		.where({ review_id: review.review_id })
		.update(review);
}

function readCritic(criticId) {
	return knex("critics")
		.select("*")
		.where({ critic_id: criticId })
		.first();
}

function readReviews(movieId) {
	return knex("reviews")
		.select("*")
		.where({ movie_id: movieId });
}

module.exports = {
	delete: destroy,
	read,
	update,
	readCritic,
	readReviews,
};