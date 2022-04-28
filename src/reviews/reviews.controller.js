const service = require("./reviews.service");

async function destroy(req, res) {
	await service.delete(Number(res.locals.review.review_id));
	res.sendStatus(204);
}

async function validateReviewId(req, res, next) {
	const { reviewId } = req.params;
	const review = await service.read(Number(reviewId));

	if(review) {
		res.locals.review = review;
		return next();
	}

	next({
		status: 404,
		message: "Review cannot be found."
	});
}

async function update(req, res) {
	const newReview = {
		...req.body.data,
		review_id: res.locals.review.review_id,
	}

	await service.update(newReview);
	const review = await service.read(res.locals.review.review_id);

	const reviewToReturn = {
		...review,
		critic: await service.readCritic(res.locals.review.critic_id),
	}

	res.json({ data: reviewToReturn });
}

async function readReviews(req, res) {
	const reviews = await service.readReviews(res.locals.movie.movie_id);

	for(let review of reviews) {
		const critic = await service.readCritic(review.critic_id);

		review["critic"] = critic;
	}

	res.json({ data: reviews });
}

module.exports = {
	delete: [validateReviewId, destroy],
	update: [validateReviewId, update],
	readReviews,
};