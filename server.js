var scraper = require('./scraper');
var db = require('./db');

var http_server = require('./http_server');

function runScraper(startAt) {
	if (!startAt) {
		startAt = 0;
	}
	scraper.scrape(startAt, function(arrayOfCharts) {
		db.insertCharts(arrayOfCharts, function(nInserted) {
			if (nInserted != 0) {
				runScraper(startAt+arrayOfCharts.length);
			}
		});
	});
}


// setInterval(function() {
// 	runScraper();
// }, 60 * 1000);


// http_server.runServer()

db.getUsers()
