var scraper = require('./scraper');
var db = require('./db');


scraper.scrape(function(arrayOfCharts) {
	db.insertCharts(arrayOfCharts);
});