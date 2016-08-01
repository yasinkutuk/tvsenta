var tradingview = require('./tradingview')


tradingview.getChartsHTML(18, function(data) {
	// console.log(data.html);
	console.log(tradingview.parseChartsHTML(data.html))
});