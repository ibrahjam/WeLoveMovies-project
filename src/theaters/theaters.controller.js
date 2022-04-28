const service = require("./theaters.service");

async function list(req, res) {
	const theaters = await service.list();

	for(let theater of theaters) {
		const movies = await service.listMovies(theater.theater_id);

		theater["movies"] = movies;
	}
	console.log("line 11");
	res.json({ data: theaters });
}

async function listSpecificMovie(req, res, next) {
	if(res.locals.movie) {
		return res.json({ data: await service.listTheaters(res.locals.movie.movie_id) });
	}
	next();
}

module.exports = {
	list: [listSpecificMovie, list],
}