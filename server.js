var scraper = require('./scraper');
var db = require('./db');


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


setInterval(function() {
	runScraper();
}, 60 * 1000);