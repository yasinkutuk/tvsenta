var asyncLoop = require('./lib/asyncloop');
var tradingview = require('./tradingview');


module.exports = {

	scrape: function(cb) {
		parsedCharts = [];

		function getAndParseData(startAt, callback) {

			tradingview.getChartsData(startAt, function(data) {
				newCharts = tradingview.parseChartsHTML(data.html);

				parsedCharts = parsedCharts.concat(newCharts);
			    callback();
			});
		}


		asyncLoop.asyncLoop(100000000, function(loop) {
		    getAndParseData(parsedCharts.length, function() {

		        // log the iteration
		        // console.log(loop.iteration());
		        if (parsedCharts.length >= 50) {
		        	// Todo hook up database
		        	loop.break();
		        };
		        // Okay, for cycle could continue
		        loop.next();
		    })},

		    function(){
		    	cb(parsedCharts);
		    }
		);



	}

}