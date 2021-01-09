const feedController = require(__dirname + '/../controllers/news');

module.exports = (app) =>{

	app.get('/get-feed', feedController.getRSSFeeds);
	// app.get('/get-search', feedController.searchRSSFeeds);
}