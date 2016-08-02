var scraper = require('./scraper');
var db = require('./db');

currentChartNumber = 0

function runScraper() {
	console.log('currentChartNumber', currentChartNumber);
	scraper.scrape(currentChartNumber, function(arrayOfCharts) {
		if (arrayOfCharts.length == 0) {
			console.log('api err, retrying');
			currentChartNumber -= 18;
			runScraper();
		} else {
			currentChartNumber += arrayOfCharts.length;
			
			db.insertCharts(arrayOfCharts, function(nInserted) {
				console.log('inserted', nInserted);
			});
		}

	});
}


setInterval(function() {
	if (currentChartNumber < 828) {}
	runScraper();
}, 2000);