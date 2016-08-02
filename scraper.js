var tradingview = require('./tradingview');


module.exports = {

	scrape: function(startAt, callback) {
		var thisFile = this;

		tradingview.getChartsData(startAt, function(data) {
			newCharts = tradingview.parseChartsHTML(data.html);
			console.log('newcharts length', newCharts.length);
			if (newCharts.length == 0) {
				thisFile.scrape(startAt)
			} else {
				typeof callback === 'function' && callback(newCharts);
			}
		});

	}

}